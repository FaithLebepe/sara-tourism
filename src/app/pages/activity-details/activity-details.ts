import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { ActivityService } from '../../core/services/activity';
import { AuthService } from '../../core/services/auth';
import { Activity, ActivityReview } from '../../core/models';
import { DecimalPipe } from '@angular/common';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-activity-details',
  imports: [ReactiveFormsModule, Navbar, DecimalPipe, DatePipe],
  standalone: true, 
  templateUrl: './activity-details.html',
  styleUrl: './activity-details.scss',
})
export class ActivityDetails implements OnInit {
  activity = signal<Activity | null>(null);
  reviews = signal<ActivityReview[]>([]);
  bookingError = signal<string | null>(null);
  bookingSuccess = signal<string | null>(null);
  submitting = signal(false);

  form: FormGroup;
  private activityId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      bookingDate: ['', Validators.required],
      numberOfPeople: [1, [Validators.required, Validators.min(1)]],
      contactEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.activityId = Number(this.route.snapshot.paramMap.get('id'));
    this.activityService.getById(this.activityId).subscribe(a => this.activity.set(a));
    this.activityService.getReviews(this.activityId).subscribe(r => this.reviews.set(r));
  }

  get averageRating(): number {
    const list = this.reviews();
    if (list.length === 0) return 0;
    return Math.round((list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10) / 10;
  }

  get estimatedTotal(): number {
    const price = this.activity()?.pricePerPerson ?? 0;
    const people = this.form.get('numberOfPeople')?.value ?? 0;
    return price * people;
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.authService.isTourist()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: `/activities/${this.activityId}` } });
      return;
    }

    const activity = this.activity();
    if (!activity) return;

    if (this.form.value.numberOfPeople > activity.maxCapacity) {
      this.bookingError.set(`Number of people exceeds this activity's maximum capacity (${activity.maxCapacity}).`);
      return;
    }

    this.bookingError.set(null);
    this.submitting.set(true);

    this.activityService.book(this.activityId, this.form.value as any).subscribe({
      next: () => this.router.navigate(['/my-bookings']),
      error: (err) => {
        this.bookingError.set(err.error?.error ?? 'Something went wrong. Please try again.');
        this.submitting.set(false);
      }
    });
  }
}