import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule]   // 👈 IMPORTANTE
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (this.username.trim() && this.password.trim()) {
      this.auth.fakeLogin(this.username);
      this.router.navigate(['/']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
