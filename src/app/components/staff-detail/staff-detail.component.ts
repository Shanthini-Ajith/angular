import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { LeaveService } from '../../services/leave.service';
import { StaffProfile, LeaveRequest, PaginatedResponse } from '../../models/models';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {
  staff: StaffProfile | null = null;
  leaveHistory: LeaveRequest[] = [];
  loading = true;
  error = '';
  staffId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.staffId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStaffDetail();
    this.loadLeaveHistory();
  }

  loadStaffDetail(): void {
    this.loading = true;
    this.error = '';
    this.staffService.getById(this.staffId).subscribe(
      (staff) => {
        this.staff = staff;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load staff details';
        this.loading = false;
        console.error(error);
      }
    );
  }

  loadLeaveHistory(): void {
    this.leaveService.getAll({ staff: this.staffId, limit: 10 }).subscribe(
      (response: PaginatedResponse<LeaveRequest>) => {
        this.leaveHistory = response.results;
      },
      (error) => {
        console.error('Failed to load leave history', error);
      }
    );
  }

  editStaff(): void {
    this.router.navigate(['/staff', this.staffId, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/staff']);
  }

  trackByLeaveId(index: number, item: LeaveRequest): number {
    return item.id;
  }
}
