import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideStore } from '@ngrx/store';
import { authReducer } from './app/auth/auth.reducer';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideStore({
      auth: authReducer
    })
  ]
}).catch(err => console.error(err));