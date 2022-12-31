import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterInterface } from '../interface/register-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {


  constructor(private http: HttpClient) {}

  public registerUser(register: RegisterInterface): Observable<any> {
    const url = 'https://qm3qruafpb.execute-api.ap-south-1.amazonaws.com/deployapi/insertDataDb';
    return this.http.post<any>(url, register);
  }

}

