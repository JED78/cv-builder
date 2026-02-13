import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cv-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './cv-layout.html',
  styleUrls: ['cv-layout.css'],
})
export class CvLayoutComponent {
    isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
}