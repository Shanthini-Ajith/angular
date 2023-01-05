import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
  constructor(private rotuter: Router) { }

  ngOnInit(): void {
  }

  studentNav() {
    // this.rotuter.navigate(['/permission'])
  }

}
