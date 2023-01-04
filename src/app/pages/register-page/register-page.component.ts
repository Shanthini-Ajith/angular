import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Validation from '../../validations/must-match';
import { ApiCallService } from 'src/app/services/api-call.service';
import { CognitoSignup, RegisterInterface } from 'src/app/interface/register-interface';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDatepickerModule, ApiCallService]
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    inputCountryCode: new FormControl(''),
    registerNumber: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  formVal: RegisterInterface;
  cognitosignup: CognitoSignup;
  subscriptions = new Subscription();
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private apiCallService: ApiCallService,
    private router: Router,
    private cognitoService: CognitoService) {
    this.formVal = {} as RegisterInterface;
    this.cognitosignup = {} as CognitoSignup;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        dob: ['', Validators.required],
        address: ['', Validators.required],
        inputCountryCode: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        registerNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    if (this.form.valid) {
      this.signupMap()
      this.formValueMap();
      this.subscriptions.add(this.cognitoService.signUp(this.cognitosignup).subscribe(data => {
        if (data.message === "Please confirm your signup") {
          this.subscriptions.add(this.apiCallService.registerUser(this.formVal).subscribe(data => {
            this.router.navigate(['/confirmSignup'], {
              queryParams: { page: 'student' }
            });
          }))
        }
        else {
          this.form.reset();
        }
      }))
    }
  }

  signupMap() {
    this.cognitosignup = {
      username: this.form.value.email.toLowerCase(),
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password,
      name: this.form.value.firstname,
    }
  }

  formValueMap() {
    const datePipe = new DatePipe('en-US');
    const date = datePipe.transform(this.form.value.dob, 'yyyy/MM/dd');
    this.formVal = {
      fname: this.form.value.firstname,
      lname: this.form.value.lastname,
      address: this.form.value.address,
      dob: date,
      mobileno: this.form.value.inputCountryCode,
      register_no: this.form.value.registerNumber,
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
