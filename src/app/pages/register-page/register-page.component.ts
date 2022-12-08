import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Validation from '../../validations/must-match';

@Component({
  standalone: true,
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MatDatepickerModule]
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
  
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

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
      alert('successfully register');
    }


    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
