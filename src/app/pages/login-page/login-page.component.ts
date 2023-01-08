import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Signin } from 'src/app/interface/register-interface';
import { ApiCallService } from 'src/app/services/api-call.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginPageComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted: boolean = false;
  urlslug: any;
  showButton: boolean = true;
  cognitosignin: Signin;
  subscriptions = new Subscription();
  userDetail: any;
  showPassword = false;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiCallService: ApiCallService) {
    this.cognitosignin = {} as Signin;
  }
  ngOnInit() {
    this.password = 'password';
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(new RegExp('^()(?=.*[A-Z])(?=.*[a-z ])(?=.*[0-9])(?=.*[@$!%*#?&.,:;"\'+/<=>\\\\\[\\]^_|{}~()\\-]).{8,}$'))
        ]
      ],
    });
  }

  formValuePatch() {
    this.cognitosignin = {
      username: this.registerForm.value.email.toLowerCase(),
      password: this.registerForm.value.password
    }
  }

  toggleShow() {
    if (this.password === 'password') {
      this.password = 'text';
      this.showPassword = true;
    } else {
      this.password = 'password';
      this.showPassword = false;
    }
  }

  //Add user form actions
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this.formValuePatch();
      this.authenticationService.login(this.cognitosignin.username, this.cognitosignin.password).subscribe(data => {
        if (data.data.access_token) {
          this.apiCallService.getUser(this.registerForm.value.email.toLowerCase()).subscribe(user => {
            this.userDetail = user.body;
            localStorage.setItem('data', JSON.stringify(this.userDetail));
            if (this.userDetail) {
              if (this.userDetail.roles === 'student') {
                this.router.navigate(['student']);
              }
              if (this.userDetail.roles === 'hod') {
                this.router.navigate(['hod']);
              }
              if (this.userDetail.roles === 'staff') {
                this.router.navigate(['staff']);
              }
              if (this.userDetail.roles === 'admin') {
                this.router.navigate(['admin']);
              }
            }
          });
        }
      });
    }
  }

  createAccount() {
    this.router.navigate(['/signup'], {
      queryParams: { returnUrl: this.urlslug },
    });
  }

}
