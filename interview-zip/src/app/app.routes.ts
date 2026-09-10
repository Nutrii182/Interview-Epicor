import { Routes } from '@angular/router';
import { editUserGuard } from './users/guards/edit-user.guard';

export const routes: Routes = [
  { path: 'roles', loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent) },
  {
    path: 'usuarios',
    children: [
      { path: '', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'nuevo', loadComponent: () => import('./users/components/users-form/users-form.component').then(m => m.UsersFormComponent) },
      {
        path: 'editar/:id',
        loadComponent: () => import('./users/components/users-form/users-form.component').then(m => m.UsersFormComponent),
        canActivate: [editUserGuard]
      },
    ]
  },
  { path: '', redirectTo: 'roles', pathMatch: 'full' },
];
