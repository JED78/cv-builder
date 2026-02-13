import { Routes } from '@angular/router';
import { CvLayoutComponent } from '../layout/cv-layout';
import { Cv } from './cv';
import { SummaryComponent } from './pages/summary/summary';
import { LoginComponent } from '../../auth/login/login';
export const CV_ROUTES: Routes = [
  {
    path: '',
    component: CvLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/summary/summary').then(c => c.SummaryComponent) },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile').then(c => c.ProfileComponent),
      },
      {
        path: 'experience',
        loadComponent: () =>
          import('./pages/experience/experience').then(c => c.ExperienceComponent),
      },
      {
        path: 'education',
        loadComponent: () =>
          import('./pages/education/education').then(c => c.EducationComponent),
      },
      {
        path: 'skills',
        loadComponent: () =>
          import('./pages/skills/skills').then(c => c.SkillsComponent),
      },
      {
        path: 'summary',
        loadComponent: () =>
          import('./pages/summary/summary').then(c => c.SummaryComponent),
      },
      { path: 'login', component: LoginComponent },

    ],
  },
];
