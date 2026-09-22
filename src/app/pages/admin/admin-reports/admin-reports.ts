import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminReportService, ReportData } from '../../../core/services/admin-report';

@Component({
  selector: 'app-admin-reports',
  imports: [AdminSidebar, FormsModule, DatePipe, DecimalPipe],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.scss',
})
export class AdminReports implements OnInit {
  report = signal<ReportData | null>(null);
  startDate: string;
  endDate: string;

  // Client-side filters - instant, no extra API call, since the date-range
  // data is already loaded in full.
  guideFilter = signal('');
  activityFilter = signal('');

  filteredToursPerGuide = computed(() => {
    const term = this.guideFilter().toLowerCase();
    const list = this.report()?.toursPerGuide ?? [];
    if (!term) return list;
    return list.filter(row => row.guidename.toLowerCase().includes(term));
  });

  filteredRevenuePerActivity = computed(() => {
    const term = this.activityFilter().toLowerCase();
    const list = this.report()?.revenuePerActivity ?? [];
    if (!term) return list;
    return list.filter(row => row.activityname.toLowerCase().includes(term));
  });

  constructor(private adminReportService: AdminReportService) {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);
    this.endDate = today.toISOString().slice(0, 10);
    this.startDate = lastMonth.toISOString().slice(0, 10);
  }

  ngOnInit() {
    this.generate();
  }

  generate() {
    this.adminReportService.get(this.startDate, this.endDate).subscribe(r => this.report.set(r));
  }

  get totalTours(): number {
    return this.report()?.toursPerGuide.reduce((sum, r) => sum + r.numberoftours, 0) ?? 0;
  }

  get totalRevenue(): number {
    return this.report()?.revenuePerActivity.reduce((sum, r) => sum + Number(r.totalrevenue), 0) ?? 0;
  }

  get averageRating(): number {
    const list = this.report()?.avgReviewsPerWeek ?? [];
    if (list.length === 0) return 0;
    const sum = list.reduce((s, r) => s + Number(r.averagerating), 0);
    return Math.round((sum / list.length) * 100) / 100;
  }
}