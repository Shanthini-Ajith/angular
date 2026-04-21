import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StaffProfile, Department, DashboardStats, PaginatedResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(params: any = {}): Observable<PaginatedResponse<StaffProfile>> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return this.http.get<PaginatedResponse<StaffProfile>>(
      `${this.apiUrl}/staff/`, { params: httpParams }
    );
  }

  getById(id: number): Observable<StaffProfile> {
    return this.http.get<StaffProfile>(`${this.apiUrl}/staff/${id}/`);
  }

  create(staffData: Partial<StaffProfile>): Observable<StaffProfile> {
    return this.http.post<StaffProfile>(`${this.apiUrl}/staff/`, staffData);
  }

  update(id: number, staffData: Partial<StaffProfile>): Observable<StaffProfile> {
    return this.http.put<StaffProfile>(`${this.apiUrl}/staff/${id}/`, staffData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/staff/${id}/`);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<PaginatedResponse<Department>>(`${this.apiUrl}/departments/`).pipe(
      map(response => response.results)
    );
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats/`);
  }
}