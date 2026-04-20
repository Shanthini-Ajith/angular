import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Attendance, PaginatedResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(params?: any): Observable<PaginatedResponse<Attendance>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PaginatedResponse<Attendance>>(
      `${this.apiUrl}/attendance`,
      { params: httpParams }
    );
  }

  checkIn(): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendance/check-in`, {});
  }

  checkOut(): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendance/check-out`, {});
  }

  markAttendance(data: any): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/attendance`, data);
  }
}
