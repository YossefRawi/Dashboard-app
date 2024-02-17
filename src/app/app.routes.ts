import { Router, Routes } from '@angular/router';
import { canActivate } from './shared/services/auth-guard';

//ROUTES
export const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./shared/components/login/login.module').then(m => m.LoginModule), 
    title: 'Login Page' },
  {
    path: 'home',
    loadChildren: () => import('./shared/components/home/home.module').then(m => m.HomeModule),
    title: 'Home Page',
    canActivate: [canActivate],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('./shared/components/pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule),
    title: '404 NOT FOUND',
  },
];
