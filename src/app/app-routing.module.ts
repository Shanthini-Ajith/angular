import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HodDashboardComponent } from './pages/hod-dashboard/hod-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { StaffDashboardComponent } from './pages/staff-dashboard/staff-dashboard.component';
import { CompletionComponent } from './pages/student-dashboard/completion/completion.component';
import { PermissionComponent } from './pages/student-dashboard/permission/permission.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { SubmissionComponent } from './pages/student-dashboard/submission/submission.component';
import { NavComponent } from './shared/nav/nav.component';
import { OtpBoxComponent } from './shared/otp-box/otp-box.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path:'home', component: HomeComponent, title: 'Home Page'},
  { path: 'login', component: LoginPageComponent, title: 'Login Page' },
  { path: 'signup', component: RegisterPageComponent, title: 'Signup Page' },
  { path: 'confirmSignup', component: OtpBoxComponent, title: 'Confirmation Page' },
  { path: 'staff', component: StaffDashboardComponent, title: 'Staff Page',canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, title: 'Admin Page',canActivate: [AuthGuard] },
  { path: 'hod', component: HodDashboardComponent, title: 'Hod Page',canActivate: [AuthGuard] },
  { path: 'student', component: StudentDashboardComponent, title: 'Student Page',canActivate: [AuthGuard],
   children: [
    { path: 'permission', component: PermissionComponent, title: 'Permission',canActivate: [AuthGuard] },
    { path: 'submission', component: SubmissionComponent, title: 'Permission',canActivate: [AuthGuard] },
    { path: 'completion', component: CompletionComponent, title: 'Permission',canActivate: [AuthGuard] },
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
