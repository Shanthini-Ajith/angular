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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private router: Router
    ) {
       this.route.queryParams.subscribe(data => {
        this.dynamicTitles = data['page'];
       })
      console.log(this.data);
    }

    onNavClick() {
      this.navClick.emit();
      this.route.queryParams.subscribe(data => {
        this.dynamicTitles = data['page'];
       })
       this.router.navigate([this.dynamicTitles], {
        queryParams: this.dynamicTitles,
      });
    }

}
