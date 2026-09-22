import { Component, OnInit, signal } from '@angular/core';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminTouristService } from '../../../core/services/admin-tourguide';
import { Tourist } from '../../../core/models';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admin-tourists',
  imports: [AdminSidebar, DatePipe],
  standalone: true,
  templateUrl: './admin-tourists.html',
  styleUrl: './admin-tourists.scss',
})
export class AdminTourists implements OnInit {
  tourists = signal<Tourist[]>([]);

  constructor(private adminTouristService: AdminTouristService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminTouristService.list().subscribe(t => this.tourists.set(t));
  }

  deactivate(id: number) {
    if (!confirm('Deactivate this tourist account?')) return;
    this.adminTouristService.deactivate(id).subscribe(() => this.load());
  }
}