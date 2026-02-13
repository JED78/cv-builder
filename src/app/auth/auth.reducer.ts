import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  user: string | null;
}

export const initialState: AuthState = {
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { username }) => ({ ...state, user: username })),
  on(logout, state => ({ ...state, user: null }))
);