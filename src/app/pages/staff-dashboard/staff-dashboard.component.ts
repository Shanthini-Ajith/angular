import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {

  menuItemslist = ['home','student details', 'report mark', 'logout'];

  constructor() { }

  ngOnInit(): void {
  }

}
