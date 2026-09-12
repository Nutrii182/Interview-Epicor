import { Component } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';
import { Observable } from 'rxjs';
import { Role } from '../roles/models/role.model';
import { Store } from '@ngrx/store';
import { selectAllRoles } from '../roles/store/roles.selectors';
import { CommonModule } from '@angular/common';
import { selectAllUsers, selectUsersLoading } from './stores/users.selectors';
import * as UsersActions from './stores/users.actions';
import * as RolesActions from '../roles/store/roles.actions';
import { Router, RouterModule } from '@angular/router';
import { User } from './models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UsersListComponent, RouterModule],
  template: `
    <div class="users-page">

      <div class="div-flex">
        <h2>Lista de Usuarios</h2>
        <div style="margin-left: auto;">
          <button class="btn-Add" (click)="onAddUser()">Agregar Usuario</button>
        </div>
      </div>

      <app-users-list
        [loading]="((loading$ | async) ?? false)"
        [users]="(users$ | async) ?? []"
      ></app-users-list>

    </div>
  `,
  styles: `
    .div-flex { display: flex; align-items: center; justify-content: space-between; }
    .users-page { max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: sans-serif; }
    h2 { color: #3f51b5; }
    .btn-Add { padding: 0.5rem 1rem; cursor: pointer; border: none; border-radius: 4px; background: #3f51b5; color: #fff; }
  `
})
export class UsersComponent {

  roles$: Observable<Role[]>;
  users$: Observable<User[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store, private router: Router) {
    this.roles$ = this.store.select(selectAllRoles);
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
    this.store.dispatch(RolesActions.loadRoles());
  }

  onAddUser(): void {
    this.store.dispatch(UsersActions.isEditing({ isEditing: false }));
    this.router.navigate(['/usuarios/nuevo']);
  }
}
