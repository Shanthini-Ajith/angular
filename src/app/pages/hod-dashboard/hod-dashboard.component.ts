import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-hod-dashboard',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.scss']
})
export class HodDashboardComponent implements OnInit {

  menuItemslist = ['view requests', 'view marks', 'logout'];
  constructor() { }

  ngOnInit(): void {
  }

}
