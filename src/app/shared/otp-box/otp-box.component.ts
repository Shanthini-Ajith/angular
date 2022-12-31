import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { ConfirmCognitoSignup } from 'src/app/interface/register-interface';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  standalone: true,
  selector: 'app-otp-box',
  templateUrl: './otp-box.component.html',
  styleUrls: ['./otp-box.component.scss'],
  imports: [ CommonModule,NgOtpInputModule]
})
export class OtpBoxComponent implements OnInit {

  confirmSignup: ConfirmCognitoSignup;
  otp: any;
  
  constructor(
    private cognitoService: CognitoService,
    private router: Router
  ) { 
    this.confirmSignup = {} as ConfirmCognitoSignup;
  }

  ngOnInit(): void {
  }

  onOtpChange(otp: any) {
    this.otp = otp;
  };

  submitOtp() {
    this.defineValue();
    this.cognitoService.confirmSignUp(this.confirmSignup).subscribe( data => {
      console.log(data);
      if (data.message === "Verified Successfully") {
        this.router.navigate(['/signin'], {
          queryParams: { page: 'student' }
        });
      }
    })
  }

  defineValue() {
    const pageData = this.cognitoService.confirmationPage
    this.confirmSignup = {
      username: pageData.username,
      password: pageData.password,
      code: this.otp
    }
  }
  
}
