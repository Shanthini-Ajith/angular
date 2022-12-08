import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  form: FormGroup = new FormGroup({
    organisationName: new FormControl(''),
    organisationWebsite: new FormControl(''),
    ContactPerson: new FormControl(''),
    ContactEmail: new FormControl(''),
    Technology: new FormControl(''),
    Duration: new FormControl(''),
    email: new FormControl(''),
  });
  
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        organisationName: ['', Validators.required],
        organisationWebsite: ['', Validators.required],
        ContactPerson: ['', Validators.required],
        ContactEmail: ['', [Validators.required, Validators.email]],
        Technology: ['', Validators.required],
        Duration: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      },
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
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
