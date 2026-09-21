import { Component, OnInit, signal } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { BookingService } from '../../core/services/booking';
import { Booking } from '../../core/models';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  imports: [Navbar, FormsModule, DatePipe],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss',
})
export class MyBookings implements OnInit {
  bookings = signal<Booking[]>([]);

  // Review modal state
  reviewModalOpen = signal(false);
  reviewBookingId = signal<number | null>(null);
  reviewRating = signal(5);
  reviewComment = '';
  reviewError = signal<string | null>(null);
  submittingReview = signal(false);

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.bookingService.myBookings().subscribe(b => this.bookings.set(b));
  }

  openReviewModal(bookingId: number) {
    this.reviewBookingId.set(bookingId);
    this.reviewRating.set(5);
    this.reviewComment = '';
    this.reviewError.set(null);
    this.reviewModalOpen.set(true);
  }

  closeReviewModal() {
    this.reviewModalOpen.set(false);
  }

  setRating(value: number) {
    this.reviewRating.set(value);
  }

  submitReview() {
    const bookingId = this.reviewBookingId();
    if (bookingId === null) return;

    this.submittingReview.set(true);
    this.reviewError.set(null);

    this.bookingService.submitReview({
      bookingId,
      rating: this.reviewRating(),
      comment: this.reviewComment,
    }).subscribe({
      next: () => {
        this.submittingReview.set(false);
        this.closeReviewModal();
        this.load(); // refresh so the review button disappears / status reflects reality
      },
      error: (err) => {
        this.reviewError.set(err.error?.error ?? 'Something went wrong.');
        this.submittingReview.set(false);
      }
    });
  }
}