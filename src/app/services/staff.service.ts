import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StaffProfile, Department, DashboardStats, PaginatedResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(params?: any): Observable<PaginatedResponse<StaffProfile>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PaginatedResponse<StaffProfile>>(
      `${this.apiUrl}/staff`,
      { params: httpParams }
    );
  }

  getById(id: number): Observable<StaffProfile> {
    return this.http.get<StaffProfile>(`${this.apiUrl}/staff/${id}`);
  }

  create(data: any): Observable<StaffProfile> {
    return this.http.post<StaffProfile>(`${this.apiUrl}/staff`, data);
  }

  update(id: number, data: any): Observable<StaffProfile> {
    return this.http.put<StaffProfile>(`${this.apiUrl}/staff/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/staff/${id}`);
  }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/departments`);
  }

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/dashboard/stats`);
  }
}
