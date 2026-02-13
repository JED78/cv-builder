import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from './auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private store: Store) {}

  fakeLogin(username: string) {
    // Aquí podrías validar algo si quieres
    this.store.dispatch(login({ username }));
  }

  fakeLogout() {
    this.store.dispatch(logout());
  }
}