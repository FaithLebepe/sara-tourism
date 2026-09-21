import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Booking } from '../models';

export interface ReviewRequest {
  bookingId: number;
  rating: number;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  myBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${API_BASE_URL}/bookings/my`);
  }

  submitReview(data: ReviewRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/bookings/review`, data);
  }
}