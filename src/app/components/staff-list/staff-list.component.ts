import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../../services/staff.service';
import { StaffProfile, Department, PaginatedResponse } from '../../models/models';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffListComponent implements OnInit, OnDestroy {
  staffList: StaffProfile[] = [];
  departments: Department[] = [];
  loading = true;
  error = '';
  currentPage = 1;
  pageSize = 10;
  totalCount = 0;

  searchTerm = '';
  selectedDepartment = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private staffService: StaffService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadStaff();

    this.searchSubject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadStaff();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadStaff(): void {
    this.loading = true;
    this.error = '';

    const params: any = {
      page: this.currentPage,
      page_size: this.pageSize
    };

    if (this.searchTerm) {
      params.search = this.searchTerm;
    }

    if (this.selectedDepartment) {
      params.department = this.selectedDepartment;
    }

    this.staffService.getAll(params).subscribe(
      (response: PaginatedResponse<StaffProfile>) => {
        this.staffList = response.results;
        this.totalCount = response.count;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load staff';
        this.loading = false;
        console.error(error);
      }
    );
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

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  onDepartmentChange(dept: string): void {
    this.selectedDepartment = dept;
    this.currentPage = 1;
    this.loadStaff();
  }

  deleteStaff(id: number): void {
    if (confirm('Are you sure you want to delete this staff member?')) {
      this.staffService.delete(id).subscribe(
        () => {
          this.staffList = this.staffList.filter(s => s.id !== id);
        },
        (error) => {
          alert('Failed to delete staff member');
          console.error(error);
        }
      );
    }
  }

  viewStaff(id: number): void {
    this.router.navigate(['/staff', id]);
  }

  editStaff(id: number): void {
    this.router.navigate(['/staff', id, 'edit']);
  }

  addNewStaff(): void {
    this.router.navigate(['/staff/new']);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadStaff();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalCount / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.loadStaff();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  trackByStaffId(index: number, staff: StaffProfile): number {
    return staff.id;
  }
}
