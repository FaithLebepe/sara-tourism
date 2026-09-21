import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Booking, TourGuide } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminBookingService {
  constructor(private http: HttpClient) {}

  list(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${API_BASE_URL}/admin/bookings`);
  }

  availableGuides(bookingId: number): Observable<TourGuide[]> {
    return this.http.get<TourGuide[]>(`${API_BASE_URL}/admin/bookings/${bookingId}/available-guides`);
  }

  allocateGuide(bookingId: number, tourGuideId: number): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/bookings/${bookingId}/allocate-guide`, { tourGuideId });
  }

  confirmArrival(bookingId: number): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/bookings/${bookingId}/confirm-arrival`, {});
  }

  cancel(bookingId: number): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/bookings/${bookingId}/cancel`, {});
  }
}