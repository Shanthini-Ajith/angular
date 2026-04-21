import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { DashboardStats, LeaveRequest } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  error = '';

  constructor(
    private staffService: StaffService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.loading = true;
    this.error = '';
    this.staffService.getDashboardStats().subscribe(
      (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load dashboard statistics';
        this.loading = false;
        console.error(error);
      }
    );
  }

  goToStaff(): void {
    this.router.navigate(['/staff']);
  }

  goToNewStaff(): void {
    this.router.navigate(['/staff/new']);
  }

  goToLeaves(): void {
    this.router.navigate(['/leaves']);
  }

  goToNewLeave(): void {
    this.router.navigate(['/leaves/new']);
  }

  trackByLeaveId(index: number, item: LeaveRequest): number {
    return item.id;
  }
}
