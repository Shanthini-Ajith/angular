import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Signin } from 'src/app/interface/register-interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CognitoService } from 'src/app/services/cognito.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {
    this.cognitosignin = {} as Signin;
    this.route.queryParams.subscribe(data => {
      this.urlslug = data;
      if (this.urlslug.page === 'staff') {
        this.showButton = false;
      }
    })
  }
  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(40)]]
    });
  }

  formValuePatch() {
    this.cognitosignin = {
      username: this.registerForm.value.email.toLowerCase(),
      password: this.registerForm.value.password
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
      console.log(this.urlslug);
      if (this.urlslug.returnUrl.includes('student') > -1) {
        this.formValuePatch();
        this.authenticationService.login(this.cognitosignin.username, this.cognitosignin.password).subscribe(data => {
          console.log(data);
          // if(data) {
            this.router.navigate(['student'], {
              queryParams: this.urlslug,
            });
          // }
        })
      }
      if (this.urlslug.page === 'staff') {
        this.router.navigate(['staff'], {
          queryParams: this.urlslug,
        });
      }
      if (this.urlslug.page === 'admin') {
        this.router.navigate(['admin'], {
          queryParams: this.urlslug,
        });
      }
      if (this.urlslug.page === 'hod') {
        this.router.navigate(['hod'], {
          queryParams: this.urlslug,
        });
      }
    }

  }

  createAccount() {
    this.router.navigate(['/signup'], {
      queryParams: this.urlslug,
    });
  }

}
