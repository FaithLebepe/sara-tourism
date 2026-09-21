import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '/home/faith-lebepe/Projects/Projects/sara_tourism/src/app/core/api-config';
import { Activity } from '/home/faith-lebepe/Projects/Projects/sara_tourism/src/app/core/models';

@Injectable({ providedIn: 'root' })
export class AdminActivityService {
  constructor(private http: HttpClient) {}

  list(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${API_BASE_URL}/admin/activities`);
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(`${API_BASE_URL}/admin/activities`, formData);
  }

  update(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${API_BASE_URL}/admin/activities/${id}`, formData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${API_BASE_URL}/admin/activities/${id}`);
  }
}