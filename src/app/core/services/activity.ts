import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { Activity, ActivityReview } from '../models';

export interface BookingCreateRequest {
  bookingDate: string;
  numberOfPeople: number;
  contactEmail: string;
}

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(private http: HttpClient) {}

  list(q?: string): Observable<Activity[]> {
    const url = q ? `${API_BASE_URL}/activities?q=${encodeURIComponent(q)}` : `${API_BASE_URL}/activities`;
    return this.http.get<Activity[]>(url);
  }

  getById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${API_BASE_URL}/activities/${id}`);
  }

  getReviews(id: number): Observable<ActivityReview[]> {
    return this.http.get<ActivityReview[]>(`${API_BASE_URL}/activities/${id}/reviews`);
  }

  book(id: number, data: BookingCreateRequest): Observable<any> {
    return this.http.post(`${API_BASE_URL}/activities/${id}/book`, data);
  }
}