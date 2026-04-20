import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { LeaveListComponent } from './components/leave-list/leave-list.component';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff',
    component: StaffListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff/new',
    component: StaffFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff/:id',
    component: StaffDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff/:id/edit',
    component: StaffFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leaves',
    component: LeaveListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leaves/new',
    component: LeaveFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
