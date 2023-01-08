import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Validation from '../../validations/must-match';
import { ApiCallService } from 'src/app/services/api-call.service';
import { CognitoSignup, RegisterInterface } from 'src/app/interface/register-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { Subscription } from 'rxjs';
import { isEmpty } from 'lodash';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
 
export const APP_DATE_FORMATS = {
  parse: {
      dateInput: 'DD/MM/YYYY',
  },
  display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'MMMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  standalone: true,
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDatepickerModule, ApiCallService,
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
  })
export class RegisterPageComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
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
  maxDate: Date;
  subscriptions = new Subscription();
  submitted = false;
  showPassword = false;
  password: any;
  passwormatch: any;
  showPasswordmatch = false;
  urlslug: any;

  constructor(private formBuilder: FormBuilder,
    private apiCallService: ApiCallService,
    private router: Router,
    private route: ActivatedRoute,
    private cognitoService: CognitoService) {
    this.formVal = {} as RegisterInterface;
    this.cognitosignup = {} as CognitoSignup;
    this.maxDate = new Date();
    this.defineForm();
  }

  ngOnInit(): void {
    this.password = 'password';
    this.passwormatch = 'password';
    this.route.queryParams.subscribe(data => {
      this.urlslug = data['returnUrl'];
    })
  }

  defineForm() {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        address: ['', Validators.required],
        inputCountryCode: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        registerNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(new RegExp('^()(?=.*[A-Z])(?=.*[a-z ])(?=.*[0-9])(?=.*[@$!%*#?&.,:;"\'+/<=>\\\\\[\\]^_|{}~()\\-]).{8,}$'))
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false]
      },
      {
        validators: [Validation.match('password', 'confirmPassword'),
        this.checkName(),
        this.noWhitespaceValidator]
      }
    );
    return this.form;
  }

  addRoute() {
    console.log('hii')
    this.router.navigate(['/login']);
  }

  public noWhitespaceValidator(control: FormGroup) {
    const firstName = control.controls['firstName'];
    const lastName = control.controls['lastName'];

    if (firstName.value) {
      const isWhitespace = firstName.value.trim().length === 0;
      if (isWhitespace) {
        firstName.setErrors({ required: { message: `Field is required` } });
      } else {
        const errors = { ...firstName?.errors };
        delete errors?.['required'];
        firstName.setErrors(isEmpty(errors) ? null : { ...errors });
      }
    }
    if (lastName.value) {
      const isWhitespace = lastName.value.trim().length === 0;
      if (isWhitespace) {
        lastName.setErrors({ required: { message: `Field is required` } });
      } else {
        const errors = { ...lastName?.errors };
        delete errors?.['required'];
        lastName.setErrors(isEmpty(errors) ? null : { ...errors });
      }
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
  toggleShowPas() {
    if (this.passwormatch === 'password') {
      this.passwormatch = 'text';
      this.showPasswordmatch = true;
    } else {
      this.passwormatch = 'password';
      this.showPasswordmatch = false;
    }
  }

  private checkName() {
    return (formGroup: FormGroup) => {
      const firstName = formGroup.controls['firstName'];
      const lastName = formGroup.controls['lastName'];

      // set error on matchingControl if validation fails
      if (!firstName.value && !lastName.value) {
        firstName.setErrors({ required: { message: `Either first or last name is required` } });
      } else {
        const errors = { ...firstName?.errors };
        delete errors?.['required'];
        firstName.setErrors(isEmpty(errors) ? null : { ...errors });
      }
    };
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
        if (data?.message === "Please confirm your signup") {
          this.subscriptions.add(this.apiCallService.registerUser(this.formVal).subscribe(data => {
            if (data) {
              this.router.navigate(['/confirmSignup']);
            }
          }))
        }
      }))
    }
  }

  signupMap() {
    this.cognitosignup = {
      username: this.form.value.email.toLowerCase(),
      email: this.form.value.email.toLowerCase(),
      password: this.form.value.password,
      name: this.form.value.firstName,
    }
  }

  formValueMap() {
    const dateformat = moment(this.form.value.dob).format('yyyy/MM/DD');
    this.formVal = {
      fname: this.form.value.firstName,
      lname: this.form.value.lastName,
      address: this.form.value.address,
      dob: dateformat,
      mobileno: this.form.value.inputCountryCode,
      register_no: this.form.value.registerNumber,
      roles: "student",
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
