import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadComponent: () => import('./pages/login.page').then(page => page.LoginPage) },
  { path: 'fila', canActivate: [authGuard], loadComponent: () => import('./pages/queue.page').then(page => page.QueuePage) },
  { path: 'regra', canActivate: [authGuard], loadComponent: () => import('./pages/rule.page').then(page => page.RulePage) },
  { path: '**', redirectTo: 'login' }
];
