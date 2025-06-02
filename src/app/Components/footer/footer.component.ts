import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private router: Router) {}

  navigateToCourse(){
    this.router.navigate(['/courses']);
  }

  navigateToContact(){
    this.router.navigate(['/contact-us']);
  }
}
