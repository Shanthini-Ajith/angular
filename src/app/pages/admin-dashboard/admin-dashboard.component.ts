import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  menuItemslist = ['home','student details', 'hod details', 'staff details', 'logout'];
  constructor() { }

  ngOnInit(): void {
  }

}
