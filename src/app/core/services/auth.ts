import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api-config';
import { AuthResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // signal holding the logged-in user's info, readable reactively by any component/template
  currentUser = signal<AuthResponse | null>(this.loadFromStorage());

  constructor(private http: HttpClient) {}

  private loadFromStorage(): AuthResponse | null {
    const raw = localStorage.getItem('auth');
    return raw ? JSON.parse(raw) : null;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, { email, password })
      .pipe(tap(res => this.setAuth(res)));
  }

  adminLogin(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/admin-login`, { email, password })
      .pipe(tap(res => this.setAuth(res)));
  }

  register(data: { name: string; surname: string; email: string; password: string; dateOfBirth: string }): Observable<any> {
    return this.http.post(`${API_BASE_URL}/auth/register`, data);
  }

  private setAuth(res: AuthResponse) {
    localStorage.setItem('auth', JSON.stringify(res));
    this.currentUser.set(res);
  }

  logout() {
    localStorage.removeItem('auth');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  isTourist(): boolean {
    return this.currentUser()?.role === 'TOURIST';
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }
}