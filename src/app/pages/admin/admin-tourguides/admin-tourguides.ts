import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminTourGuideService } from '../../../core/services/admin-tourguide';
import { TourGuide } from '../../../core/models';

@Component({
  selector: 'app-admin-tourguides',
  imports: [AdminSidebar, FormsModule],
  templateUrl: './admin-tourguides.html',
  standalone: true,
  styleUrl: './admin-tourguides.scss',
})
export class AdminTourguides implements OnInit {
  guides = signal<TourGuide[]>([]);
  formOpen = signal(false);
  editingId: number | null = null;
  formError = signal<string | null>(null);
  model = { name: '', specialization: 'Wildlife tours' };

  constructor(private adminTourGuideService: AdminTourGuideService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminTourGuideService.list().subscribe(g => this.guides.set(g));
  }

  openAddForm() {
    this.editingId = null;
    this.model = { name: '', specialization: 'Wildlife tours' };
    this.formError.set(null);
    this.formOpen.set(true);
  }

  openEditForm(guide: TourGuide) {
    this.editingId = guide.tourGuideId;
    this.model = { name: guide.name, specialization: guide.specialization };
    this.formError.set(null);
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
  }

  save() {
    const request = this.editingId
      ? this.adminTourGuideService.update(this.editingId, this.model)
      : this.adminTourGuideService.create(this.model);

    request.subscribe({
      next: () => { this.closeForm(); this.load(); },
      error: (err) => this.formError.set(err.error?.error ?? 'Something went wrong.')
    });
  }

  deleteGuide(id: number) {
    if (!confirm('Remove this tour guide?')) return;
    this.adminTourGuideService.delete(id).subscribe(() => this.load());
  }
}