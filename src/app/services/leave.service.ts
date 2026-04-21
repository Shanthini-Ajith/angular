import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LeaveRequest, PaginatedResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(params?: any): Observable<PaginatedResponse<LeaveRequest>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PaginatedResponse<LeaveRequest>>(
      `${this.apiUrl}/leaves`,
      { params: httpParams }
    );
  }

  getById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/leaves/${id}/`);
  }

  create(data: any): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}/leaves/`, data);
  }

  approve(id: number): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}/leaves/${id}/approve/`, {});
  }

  reject(id: number, rejection_reason?: string): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}/leaves/${id}/reject/`, {
      rejection_reason: rejection_reason || ''
    });
  }
}
