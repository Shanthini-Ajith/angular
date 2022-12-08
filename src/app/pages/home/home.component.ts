import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  studentClick() {
    this.router.navigate(['/login'], {
      queryParams: { page: 'student' }
    });
  }

  adminClick() {
    this.router.navigate(['/login'], {
      queryParams: { page: 'admin' }
    });
  }

  staffClick() {
    this.router.navigate(['/login'], {
      queryParams: { page: 'staff' }
    });
  }

  hodClick() {
    this.router.navigate(['/login'], {
      queryParams: { page: 'hod' }
    });
  }

}
