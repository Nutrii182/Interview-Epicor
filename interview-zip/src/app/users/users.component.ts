import { Component } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';
import { Observable } from 'rxjs';
import { Role } from '../roles/models/role.model';
import { Store } from '@ngrx/store';
import { selectAllRoles } from '../roles/store/roles.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UsersListComponent],
  template: `
    <div class="users-page">
      <h2>Lista de Usuarios</h2>

      <app-users-list
        [roles]="(roles$ | async) ?? []"
      ></app-users-list>

    </div>
  `,
  styles: `
    .users-page { max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: sans-serif; }
    h2 { color: #3f51b5; margin-bottom: 1.5rem; }
  `
})
export class UsersComponent {

  roles$: Observable<Role[]>;
  // loading$: Observable<boolean>;

  constructor(private store: Store) {
      this.roles$ = this.store.select(selectAllRoles);
      // this.loading$ = this.store.select(selectRolesLoading);
    }
}
