import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  public getUser(gmail:string): Observable<any> {
    const url = 'https://vul0t0psx9.execute-api.ap-south-1.amazonaws.com/signin/getDataFromDb';
    return this.http.post<any>(url, {email:gmail});
  }

}

