import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient) {
    this.loadTokensFromMemory();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return new Observable(observer => {
      this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password })
        .subscribe(
          response => {
            this.accessToken = response.access;
            this.refreshToken = response.refresh;
            this.currentUserSubject.next(response.user);
            observer.next(response);
            observer.complete();
          },
          error => observer.error(error)
        );
    });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    this.currentUserSubject.next(null);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`);
  }

  updateProfile(data: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/auth/profile`, data);
  }

  getToken(): string | null {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    return this.accessToken !== null;
  }

  refreshAccessToken(): Observable<any> {
    if (!this.refreshToken) {
      return new Observable(observer => observer.error('No refresh token'));
    }

    return new Observable(observer => {
      this.http.post<LoginResponse>(`${this.apiUrl}/auth/refresh`, { refresh: this.refreshToken })
        .subscribe(
          response => {
            this.accessToken = response.access;
            observer.next(response);
            observer.complete();
          },
          error => observer.error(error)
        );
    });
  }

  private loadTokensFromMemory(): void {
    // Tokens are stored in memory during the session
    // They will be lost on page refresh
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
