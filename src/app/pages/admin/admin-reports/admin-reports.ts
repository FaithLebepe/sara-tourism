import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminReportService, ReportData } from '../../../core/services/admin-report';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  imports: [AdminSidebar, FormsModule, DatePipe, DecimalPipe],
  standalone: true,
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.scss',
})
export class AdminReports implements OnInit {
  report = signal<ReportData | null>(null);
  startDate: string;
  endDate: string;

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