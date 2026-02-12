import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/cv/cv.routes').then(m => m.CV_ROUTES),
  },
];