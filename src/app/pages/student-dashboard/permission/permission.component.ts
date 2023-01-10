import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavComponent],
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
    email: new FormControl(''),
    cityName: new FormControl(''),
    industryName: new FormControl('')
  });
  submitted = false;
  City: any = ['2 weeks', '4 weeks'];
  Industry: any = ['IT Industry', 'E-Commerce'];
  url: string | ArrayBuffer = "";
  urlType: string | ArrayBuffer = "";
  typeOfUrl: boolean = false;
  fileTypeofUrl: boolean = false;
  type = ['jpg', 'jpeg', 'png', 'webpg', 'gif'];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        organisationName: ['', Validators.required],
        organisationWebsite: ['', Validators.required],
        ContactPerson: ['', Validators.required],
        ContactEmail: ['', [Validators.required, Validators.email]],
        industryName: ['', Validators.required],
        Technology: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        cityName: ['', Validators.required]
      },
    );
    this.formvaluePatch();
  }

  formvaluePatch() {
    const mail = JSON.parse(localStorage.getItem('data')!);
    this.form.patchValue({
      email: mail.email
    });
    this.form.controls['email'].disable();
  }

  changeCity(e: any) {
    this.form.controls['cityName']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeIndustry(e: any) {
    this.form.controls['industryName']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSelectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url
      const urlReader = e.target.files[0].name.split(".").pop();
      const findType = this.type.filter(((item, index)=> { let i = index; return item == urlReader;}))
      if(findType.length === 0) {
        this.fileTypeofUrl = false;
      }
      else {
        this.fileTypeofUrl = true;
      }
      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event?.target?.result){
          this.url = event.target.result;
        }
      }
    }
  }

  onSelectFileType(e: any) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]); // read file as data url
      const urlReader = e.target.files[0].name.split(".").pop();
      const findType = this.type.filter(((item, index)=> { let i = index; return item == urlReader;}))
      if(findType.length === 0) {
        this.typeOfUrl = false;
      }
      else {
        this.typeOfUrl = true;
      }
      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event?.target?.result){
          this.urlType = event.target.result;
        }
      }
    }
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
