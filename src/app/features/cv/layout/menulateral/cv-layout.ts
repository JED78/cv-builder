import { Component, Input  } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-cv-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule, RouterModule],
  templateUrl: './cv-layout.html',
  styleUrls: ['cv-layout.css'],
})
export class CvLayoutComponent {
  @Input() temaAzul = false;  
    isMenuOpen = false;

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}
}