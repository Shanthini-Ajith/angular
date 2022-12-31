import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CognitoSignup, ConfirmCognitoSignup, RegisterInterface } from '../interface/register-interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  formVal:RegisterInterface;
  confirmationPage: any;

  constructor(private http: HttpClient) {
    // this.authenticationSubject = new BehaviorSubject<boolean>(false);
    this.formVal = {} as RegisterInterface;
  }

  public signUp(signup: CognitoSignup): Observable<any> {
    const url = ' https://wkmdoqntw5.execute-api.ap-south-1.amazonaws.com/cognito-signup/cognito_auth';
    this.confirmationPage = signup;
    return this.http.post<any>(url, signup);
  }

  public confirmSignUp(confirmSignup: ConfirmCognitoSignup): Observable<any> {
    const url = 'https://zng61hhyrb.execute-api.ap-south-1.amazonaws.com/confirm-signup/confirmEmail';
    return this.http.post<any>(url, confirmSignup);
  }

  // public signIn(user: RegisterInterface): Promise<any> {
  //   return Auth.signIn(user.email, user.password)
  //   .then(() => {
  //     this.authenticationSubject.next(true);
  //   });
  // }

  // public signOut(): Promise<any> {
  //   return Auth.signOut()
  //   .then(() => {
  //     this.authenticationSubject.next(false);
  //   });
  // }

  // public isAuthenticated(): Promise<boolean> {
  //   if (this.authenticationSubject.value) {
  //     return Promise.resolve(true);
  //   } else {
  //     return this.getUser()
  //     .then((user: any) => {
  //       if (user) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }).catch(() => {
  //       return false;
  //     });
  //   }
  // }

  // public getUser(): Promise<any> {
  //   return Auth.currentUserInfo();
  // }

  // public updateUser(user: RegisterInterface): Promise<any> {
  //   return Auth.currentUserPoolUser()
  //   .then((cognitoUser: any) => {
  //     return Auth.updateUserAttributes(cognitoUser, user);
  //   });
  // }

}