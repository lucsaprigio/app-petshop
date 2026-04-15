import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login),
  },
  {
    path: 'cliente/dashboard',
    loadComponent: () => import('./features/cliente/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: 'admin/kanban',
    loadComponent: () => import('./features/admin/kanban/kanban').then(m => m.Kanban),
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: '/login' },
];
