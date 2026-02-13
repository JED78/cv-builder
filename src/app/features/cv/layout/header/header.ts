import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [CommonModule], 
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

  temaAzul = true;

cambiarTema() {
  console.log('entrando en cambiar de tema');
  this.temaAzul = !this.temaAzul;

  if (this.temaAzul) {
    console.log('Añadir tema azul');
    document.body.classList.add('azul');
  } else {
    console.log('Quitar tema azul');
    document.body.classList.remove('azul');
  }
}

}