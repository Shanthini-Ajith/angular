import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavComponent } from 'src/app/shared/nav/nav.component';
import { S3ServiceService } from 'src/app/services/s3-service.service';
import { ApiCallService } from 'src/app/services/api-call.service';
import { PermissioData } from 'src/app/interface/register-interface';

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
    organizationName: new FormControl(''),
    organizationWebsite: new FormControl(''),
    ContactPerson: new FormControl(''),
    ContactEmail: new FormControl(''),
    Technology: new FormControl(''),
    email: new FormControl(''),
    requestWeeks: new FormControl(''),
    industryName: new FormControl('')
  });
  submitted = false;
  weeks: any = ['2 weeks', '4 weeks'];
  industry: any = ['IT Industry', 'E-Commerce'];
  url: string | ArrayBuffer = "";
  urlType: string | ArrayBuffer = "";
  typeOfUrl: boolean = false;
  fileTypeofUrl: boolean = false;
  type = ['jpg', 'jpeg', 'png', 'webpg', 'gif'];
  selectedFile: any;
  selecteds3File:any;
  permissionPageData: PermissioData;
  selectedOptionWeeks: any;
  selectedOptionIndustry: any;

  constructor(private formBuilder: FormBuilder,
    private s3Service: S3ServiceService,
    private apiCallService: ApiCallService) {
      this.permissionPageData = {} as PermissioData;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        organizationName: ['', Validators.required],
        organizationWebsite: ['', Validators.required],
        ContactPerson: ['', Validators.required],
        ContactEmail: ['', [Validators.required, Validators.email]],
        industryName: ['', Validators.required],
        Technology: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        requestWeeks: ['', Validators.required],
        organisationLetter: ['', Validators.required],
        RequestLetter: ['', Validators.required]
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
    this.form.controls['requestWeeks']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeIndustry(e: any) {
    this.form.controls['industryName']?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  submitMap() {
    console.log(this.form);
    const d1 = this.selectedOptionWeeks.split(": ");
    const d2 = this.selectedOptionIndustry.split(": ");
    console.log(d1[1]);
    this.permissionPageData = {
      email: this.form.controls['email'].value,
      weeks: d1[1],
      industry: d2[1],
      organizationName: this.form?.value?.organizationName,
      organizationWebsite:this.form?.value?.organizationWebsite,
      contactName:this.form?.value?.ContactPerson,
      contactEmail: this.form?.value?.ContactEmail,
      technology: this.form?.value?.Technology
    }
  }

  onSelectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      this.selecteds3File = e.target.files[0];
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
      this.selectedFile = e.target.files[0];
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
      this.submitMap();
      this.s3Service.uploadFileWithPreSignedURL(this.selectedFile);
      this.s3Service.uploadFileWithPreSignedURL(this.selecteds3File);
      this.apiCallService.permissionData(this.permissionPageData).subscribe(data => {
        console.log(data);
      })
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
