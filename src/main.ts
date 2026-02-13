import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideStore } from '@ngrx/store';
import { authReducer } from './app/auth/auth.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),

    // 🔥 Necesario para que funcione MatSnackBar
    importProvidersFrom(BrowserAnimationsModule),

    // Tu store
    provideStore({
      auth: authReducer,
    }),
  ]
}).catch(err => console.error(err));