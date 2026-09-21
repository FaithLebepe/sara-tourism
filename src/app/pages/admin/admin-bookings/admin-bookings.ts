import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminBookingService } from '../../../core/services/admin-booking';
import { Booking, TourGuide } from '../../../core/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-bookings',
  imports: [AdminSidebar, FormsModule, DatePipe],
  standalone: true,
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.scss',
})
export class AdminBookings implements OnInit {
  bookings = signal<Booking[]>([]);
  statusFilter = '';

  allocateModalOpen = signal(false);
  allocateBookingId = signal<number | null>(null);
  availableGuides = signal<TourGuide[]>([]);
  selectedGuideId: number | null = null;
  actionError = signal<string | null>(null);

  constructor(private adminBookingService: AdminBookingService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminBookingService.list().subscribe(b => this.bookings.set(b));
  }

  get filteredBookings() {
    if (!this.statusFilter) return this.bookings();
    return this.bookings().filter(b => b.bookingstatus === this.statusFilter);
  }

  openAllocateModal(bookingId: number) {
    this.allocateBookingId.set(bookingId);
    this.selectedGuideId = null;
    this.actionError.set(null);
    this.adminBookingService.availableGuides(bookingId).subscribe(guides => {
      this.availableGuides.set(guides);
      this.allocateModalOpen.set(true);
    });
  }

  closeAllocateModal() {
    this.allocateModalOpen.set(false);
  }

  confirmAllocation() {
    const bookingId = this.allocateBookingId();
    if (bookingId === null || this.selectedGuideId === null) return;

    this.adminBookingService.allocateGuide(bookingId, this.selectedGuideId).subscribe({
      next: () => {
        this.closeAllocateModal();
        this.load();
      },
      error: (err) => this.actionError.set(err.error?.error ?? 'Something went wrong.')
    });
  }

  confirmArrival(bookingId: number) {
    this.adminBookingService.confirmArrival(bookingId).subscribe(() => this.load());
  }

  cancelBooking(bookingId: number) {
    if (!confirm('Cancel this booking?')) return;
    this.adminBookingService.cancel(bookingId).subscribe(() => this.load());
  }
}