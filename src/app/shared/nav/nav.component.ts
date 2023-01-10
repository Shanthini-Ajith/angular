import { LayoutModule } from '@angular/cdk/layout';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentDashboardComponent } from '../../pages/student-dashboard/student-dashboard.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ApiCallService } from 'src/app/services/api-call.service';

@Component({
  standalone: true,
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  
  imports: [LayoutModule, CommonModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, RouterModule, StudentDashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Input() data: any = [];
  @Output() navClick = new EventEmitter<void>();
  dynamicTitles: any;
  pages : string[] =[];
  email: string = "";

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
        const url = JSON.parse(localStorage.getItem('data')!);
        if(url.roles.includes('returnUrl')) {
          this.dynamicTitles = url.roles;
        }
        else {
          this.dynamicTitles = url.roles
        }
    }

    onNavClick() {
      this.navClick.emit();
       this.router.navigate([this.dynamicTitles]);
    }

    // onItemClick(item: any) {
    //   this.pages.push(item);
    //   const permission = 'permission'
    //   if(item.includes('logout')) {
    //     this.authenticationService.logout(this.dynamicTitles);
    //   }
    //   if(item.includes('permission')) {
    //     this.router.navigate(['permission']);
    //   }
    // }

    logout() {
      this.authenticationService.logout(this.dynamicTitles);
    }

}
