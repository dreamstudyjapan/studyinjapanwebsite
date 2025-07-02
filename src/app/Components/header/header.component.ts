import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}

  navigate(value : string){
    this.router.navigate([value]);
  }
  
  collapseNavbar(): void {
    const navbar = document.getElementById('navbarCollapse');
    if (navbar?.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  }
}
