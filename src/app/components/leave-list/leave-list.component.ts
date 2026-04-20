import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../../services/leave.service';
import { LeaveRequest, PaginatedResponse } from '../../models/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-leave-list',
  templateUrl: './leave-list.component.html',
  styleUrls: ['./leave-list.component.scss']
})
export class LeaveListComponent implements OnInit, OnDestroy {
  leaveList: LeaveRequest[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;
  selectedStatus = '';
  private destroy$ = new Subject<void>();

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadLeaves();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLeaves(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      page: this.currentPage,
      page_size: this.pageSize
    };

    if (this.selectedStatus) {
      params.status = this.selectedStatus;
    }

    this.leaveService.getAll(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: PaginatedResponse<LeaveRequest>) => {
          this.leaveList = response.results;
          this.totalCount = response.count;
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load leaves';
          this.loading = false;
          console.error(error);
        }
      );
  }

  onStatusChange(status: string): void {
    this.selectedStatus = status;
    this.currentPage = 1;
    this.loadLeaves();
  }

  approveLeave(id: number): void {
    if (confirm('Are you sure you want to approve this leave request?')) {
      this.leaveService.approve(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loadLeaves();
          },
          (error) => {
            alert('Failed to approve leave request');
            console.error(error);
          }
        );
    }
  }

  rejectLeave(id: number): void {
    const reason = prompt('Please provide a rejection reason:');
    if (reason !== null) {
      this.leaveService.reject(id, reason)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loadLeaves();
          },
          (error) => {
            alert('Failed to reject leave request');
            console.error(error);
          }
        );
    }
  }

  requestNewLeave(): void {
    this.router.navigate(['/leaves/new']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLeaves();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalCount / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadLeaves();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  trackByLeaveId(index: number, leave: LeaveRequest): number {
    return leave.id;
  }
}
