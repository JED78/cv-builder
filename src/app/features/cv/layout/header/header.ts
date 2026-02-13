import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})


export class HeaderComponent {
  menuOpen = false;
  darkMode = false;
  constructor(private router: Router) {}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}