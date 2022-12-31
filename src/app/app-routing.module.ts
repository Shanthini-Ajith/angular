import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HodDashboardComponent } from './pages/hod-dashboard/hod-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StaffDashboardComponent } from './pages/staff-dashboard/staff-dashboard.component';
import { PermissionComponent } from './pages/student-dashboard/permission/permission.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { NavComponent } from './shared/nav/nav.component';
import { OtpBoxComponent } from './shared/otp-box/otp-box.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'home', component: HomeComponent, title: 'Home Page'},
  { path: 'login', component: LoginPageComponent, title: 'Login Page' },
  { path: 'signup', component: RegisterPageComponent, title: 'Signup Page' },
  { path: 'student', component: StudentDashboardComponent, title: 'Student Page' },
  { path: 'confirmSignup', component: OtpBoxComponent, title: 'Confirmation Page' },
  { path: 'staff', component: StaffDashboardComponent, title: 'Staff Page' },
  { path: 'admin', component: AdminDashboardComponent, title: 'Admin Page' },
  { path: 'hod', component: HodDashboardComponent, title: 'Hod Page' },
  { path: '', component: NavComponent, children: [
    { path: 'permission', component: PermissionComponent, title: 'Permission' },
    // { path: 'submission', component: PermissionComponent, title: 'Permission' },
    // { path: 'completion', component: PermissionComponent, title: 'Permission' },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
