import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  form!: FormGroup;
  submitting = false;
  error = '';
  success = '';
  submitted = false;
  daysCalculated = 0;

  leaveTypes = [
    { value: 'sick', label: 'Sick Leave' },
    { value: 'casual', label: 'Casual Leave' },
    { value: 'earned', label: 'Earned Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      leave_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: this.dateValidator.bind(this)
    });

    this.form.get('start_date')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });

    this.form.get('end_date')?.valueChanges.subscribe(() => {
      this.calculateDays();
    });
  }

  get f() {
    return this.form.controls;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const start = control.get('start_date')?.value;
    const end = control.get('end_date')?.value;

    if (start && end && start > end) {
      control.get('end_date')?.setErrors({ 'endDateBeforeStart': true });
      return { 'endDateBeforeStart': true };
    }

    return null;
  }

  calculateDays(): void {
    const start = this.form.get('start_date')?.value;
    const end = this.form.get('end_date')?.value;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDiff = endDate.getTime() - startDate.getTime();
      this.daysCalculated = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1;
    } else {
      this.daysCalculated = 0;
    }
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

    this.leaveService.create(data).subscribe(
      () => {
        this.success = 'Leave request submitted successfully';
        setTimeout(() => {
          this.router.navigate(['/leaves']);
        }, 1500);
      },
      (error) => {
        this.error = error?.error?.detail || 'Failed to submit leave request';
        this.submitting = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/leaves']);
  }
}
