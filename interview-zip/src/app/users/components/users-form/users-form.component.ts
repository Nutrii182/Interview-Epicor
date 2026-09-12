import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Role } from '../../../roles/models/role.model';
import { Store } from '@ngrx/store';
import { selectAllRoles } from '../../../roles/store/roles.selectors';
import { first, Observable, take } from 'rxjs';
import * as UsersActions from '../../stores/users.actions';
import { selectIsEditing, selectUserById } from '../../stores/users.selectors';
import { isEditing } from '../../stores/users.actions';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="form-page">
      <div class="form-container">
        <h3>{{ (isEditing$ | async) ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
        <form (ngSubmit)="onSubmit()">
          <div class="field">
            <label for="firstName">Nombre</label>
            <input id="firstName" name="firstName" [(ngModel)]="user.firstName" required placeholder="Ej: Juan" required />
          </div>
          <div class="field">
            <label for="lastName">Apellido</label>
            <input id="lastName" name="lastName" [(ngModel)]="user.lastName" required placeholder="Ej: Pérez" required />
          </div>
          <div class="field">
            <label for="age">Edad</label>
            <input id="age" name="age" [(ngModel)]="user.age" type="number" required placeholder="Ej: 30" required />
          </div>
          <div class="field">
            <label for="role">Role</label>
            <select [(ngModel)]="user.role" name="role" (ngModelChange)="onRoleChange($event)" required>
                <option selected disabled value="">Selecciona un role</option>
                <option *ngFor="let role of roles$ | async" [value]="role.name">
                  {{ role.name }}
                </option>
              </select>
          </div>
          <div class="actions">
            <button type="submit">{{ (isEditing$ | async) ? 'Actualizar' : 'Crear' }}</button>
            <button type="button" class="btn-cancel" (click)="goToUsersList()">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: `
    .form-page { max-width: 900px; margin: 2rem auto; padding: 0 1rem; font-family: sans-serif; }
    h2 { color: #3f51b5; margin-bottom: 1.5rem; }
    .form-container { background: #f9f9f9; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; }
    h3 { margin: 0 0 1rem; }
    .field { margin-bottom: 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
    label { font-weight: 500; font-size: 0.9rem; }
    input, textarea, select { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; width: 100%; box-sizing: border-box; }
    textarea { resize: vertical; min-height: 80px; }
    .actions { display: flex; gap: 0.5rem; }
    button { padding: 0.5rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; background: #3f51b5; color: #fff; }
    .btn-cancel { background: #e53935; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
  `
})
export class UsersFormComponent {

  roles$: Observable<Role[]>;
  isEditing$: Observable<boolean>;

  private router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  userId: number | null = null;

  // Object linked to ngModel
  user: Partial<User> = {
    firstName: '',
    lastName: '',
    age: undefined,
    role: ''
  };

  constructor() {
    this.roles$ = this.store.select(selectAllRoles);
    this.isEditing$ = this.store.select(selectIsEditing);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = +idParam;
        this.store.select(selectUserById(this.userId)).subscribe(user => {
          if (user) {
            this.user = { ...user };
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (!this.user.firstName?.trim() || !this.user.lastName?.trim() || this.user.age === null || this.user.age === undefined
      || this.user.age <= 0 || !this.user.role?.trim()) return;

    const userToUpdate: User = {
      ...this.user,
      id: this.user.id!
    } as User;

    this.isEditing$.pipe(first()).subscribe(isEditing => {
      if (isEditing) {
        this.store.dispatch(UsersActions.updateUser({ editedUser: userToUpdate }));
      } else {
        this.store.dispatch(UsersActions.addUser({ newUser: this.user as User }));
      }
      this.goToUsersList();
    });
  }

  onRoleChange(newRoleId: string) {
    this.user.role = newRoleId;
  }

  goToUsersList(): void {
    this.store.dispatch(UsersActions.isEditing({ isEditing: false }));
    this.router.navigate(['/usuarios']);
  }

}
