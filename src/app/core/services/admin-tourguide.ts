import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { TourGuide, Tourist } from '../models';

@Injectable({ providedIn: 'root' })
export class AdminTourGuideService {
  constructor(private http: HttpClient) {}

  list(): Observable<TourGuide[]> {
    return this.http.get<TourGuide[]>(`${API_BASE_URL}/admin/tourguides`);
  }
  create(data: { name: string; specialization: string }): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/tourguides`, data);
  }
  update(id: number, data: { name: string; specialization: string }): Observable<any> {
    return this.http.put(`${API_BASE_URL}/admin/tourguides/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${API_BASE_URL}/admin/tourguides/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class AdminTouristService {
  constructor(private http: HttpClient) {}

  list(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(`${API_BASE_URL}/admin/tourists`);
  }
  deactivate(id: number): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/tourists/${id}/deactivate`, {});
  }
}