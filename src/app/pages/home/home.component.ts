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
    this.router.navigate(['/signup'])
  }

  adminClick() {
    this.router.navigate(['/signup'])
    }

  staffClick() {
    this.router.navigate(['/signup']);
  }

  hodClick() {
    this.router.navigate(['/signup']);
  }

}
