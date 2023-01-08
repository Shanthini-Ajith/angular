import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NgModule, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ApiCallService } from 'src/app/services/api-call.service';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  standalone: true,
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  imports: [NavComponent, CommonModule,  RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class StudentDashboardComponent implements OnInit {
  
  menuItemslist = ['logout', 'permission', 'submission', 'completion'];
  @Output() email: string = "";

  constructor(private rotuter: Router,
    private apiCallService: ApiCallService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const mail = JSON.parse(localStorage.getItem('data')!);
    this.apiCallService.getUser(mail).subscribe(user=> {
      const detail = user.body;
      if(detail) {
        this.email = detail.email;

      }
    });
  }

}
