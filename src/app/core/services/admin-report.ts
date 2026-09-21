import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api-config';

export interface ReportData {
  toursPerGuide: { tourguideid: number; guidename: string; numberoftours: number }[];
  avgReviewsPerWeek: { yearweek: string; weekstarting: string; averagerating: number; numberofreviews: number }[];
  revenuePerActivity: { activityid: number; activityname: string; numberofbookings: number; totalrevenue: number }[];
}

@Injectable({ providedIn: 'root' })
export class AdminReportService {
  constructor(private http: HttpClient) {}

  get(start: string, end: string): Observable<ReportData> {
    return this.http.get<ReportData>(`${API_BASE_URL}/admin/reports?start=${start}&end=${end}`);
  }
}