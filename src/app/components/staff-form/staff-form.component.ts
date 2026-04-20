import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { StaffProfile, Department } from '../../models/models';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
  form!: FormGroup;
  departments: Department[] = [];
  loading = false;
  submitting = false;
  error = '';
  success = '';
  isEditMode = false;
  staffId: number = 0;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) { }

  ngOnInit(): void {
    this.staffId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = this.staffId > 0;

    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\(\)\s]+$/)]],
      department: ['', [Validators.required]],
      designation: ['', [Validators.required, Validators.minLength(2)]],
      date_of_joining: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(0)]]
    });

    this.loadDepartments();

    if (this.isEditMode) {
      this.loadStaffData();
    }
  }

  get f() {
    return this.form.controls;
  }

  loadDepartments(): void {
    this.staffService.getDepartments().subscribe(
      (departments) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Failed to load departments', error);
      }
    );
  }

  loadStaffData(): void {
    this.loading = true;
    this.staffService.getById(this.staffId).subscribe(
      (staff: StaffProfile) => {
        this.form.patchValue({
          first_name: staff.user.first_name,
          last_name: staff.user.last_name,
          email: staff.user.email,
          phone: staff.phone,
          department: staff.department.id,
          designation: staff.designation,
          date_of_joining: staff.date_of_joining,
          salary: staff.salary
        });
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load staff data';
        this.loading = false;
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    const data = this.form.value;

    if (this.isEditMode) {
      this.staffService.update(this.staffId, data).subscribe(
        () => {
          this.success = 'Staff member updated successfully';
          setTimeout(() => {
            this.router.navigate(['/staff', this.staffId]);
          }, 1500);
        },
        (error) => {
          this.error = error?.error?.detail || 'Failed to update staff member';
          this.submitting = false;
        }
      );
    } else {
      this.staffService.create(data).subscribe(
        (staff) => {
          this.success = 'Staff member created successfully';
          setTimeout(() => {
            this.router.navigate(['/staff', staff.id]);
          }, 1500);
        },
        (error) => {
          this.error = error?.error?.detail || 'Failed to create staff member';
          this.submitting = false;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/staff']);
  }
}
