import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminActivityService } from '../../../core/services/admin-activity';
import { ActivityWithPopularity } from '../../../core/models';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-admin-activities',
  imports: [AdminSidebar, FormsModule, DecimalPipe],
  templateUrl: './admin-activities.html',
  styleUrl: './admin-activities.scss',
})
export class AdminActivities implements OnInit {
  activities = signal<ActivityWithPopularity[]>([]);
  formOpen = signal(false);
  editingId: number | null = null;
  selectedFile: File | null = null;
  formError = signal<string | null>(null);

  model = { activityName: '', description: '', location: '', durationMinutes: 60, pricePerPerson: 0, maxCapacity: 1 };

  constructor(private adminActivityService: AdminActivityService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminActivityService.list().subscribe(a => this.activities.set(a));
  }

  openAddForm() {
    this.editingId = null;
    this.model = { activityName: '', description: '', location: '', durationMinutes: 60, pricePerPerson: 0, maxCapacity: 1 };
    this.selectedFile = null;
    this.formError.set(null);
    this.formOpen.set(true);
  }

  openEditForm(activity: ActivityWithPopularity) {
    this.editingId = activity.activityid;
    this.model = {
      activityName: activity.activityname,
      description: activity.description ?? '',
      location: activity.location,
      durationMinutes: activity.durationminutes,
      pricePerPerson: activity.priceperperson,
      maxCapacity: activity.maxcapacity,
    };
    this.selectedFile = null;
    this.formError.set(null);
    this.formOpen.set(true);
  }

  closeForm() {
    this.formOpen.set(false);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  save() {
    const formData = new FormData();
    formData.append('activityName', this.model.activityName);
    formData.append('description', this.model.description);
    formData.append('location', this.model.location);
    formData.append('durationMinutes', String(this.model.durationMinutes));
    formData.append('pricePerPerson', String(this.model.pricePerPerson));
    formData.append('maxCapacity', String(this.model.maxCapacity));
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    const request = this.editingId !== null
      ? this.adminActivityService.update(this.editingId, formData)
      : this.adminActivityService.create(formData);

    request.subscribe({
      next: () => { this.closeForm(); this.load(); },
      error: (err) => this.formError.set(err.error?.error ?? 'Something went wrong.')
    });
  }

  deleteActivity(id: number) {
    if (!confirm('Remove this activity?')) return;
    this.adminActivityService.delete(id).subscribe(() => this.load());
  }
}