import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Role } from '../../../roles/models/role.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="roles-list">
      <div *ngIf="loading" class="loading">Cargando roles...</div>

      <!-- <table *ngIf="!loading"> -->
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.age }}</td>
            <td>
              <select 
                [ngModel]="user.role"
                (ngModelChange)="onRoleChange(user, $event)">
                <option [ngValue]="null" disabled>Selecciona un role</option>
                <option *ngFor="let role of roles" [value]="role.id">
                  {{ role.name }}
                </option>
              </select>
            </td>
            <td>
              <button (click)="edit.emit(user)">Editar</button>
              <button (click)="delete.emit(user.id)" class="btn-danger">Eliminar</button>
            </td>
          </tr>
          <tr *ngIf="users.length === 0">
            <td colspan="5" class="empty">No hay usuarios registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .roles-list { width: 100%; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.75rem 1rem; border-bottom: 1px solid #ddd; text-align: left; }
    th { background: #f5f5f5; font-weight: 600; }
    button { margin-right: 0.5rem; padding: 0.3rem 0.7rem; cursor: pointer; border: none; border-radius: 4px; background: #3f51b5; color: #fff; }
    .btn-danger { background: #e53935; }
    .loading { padding: 1rem; color: #888; }
    .empty { text-align: center; color: #aaa; }
  `
})
export class UsersListComponent {
  @Input() loading = false;
  @Input() users: User[] = [];
  @Input() roles: Role[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();

  onRoleChange(user: User, newRoleId: string) {
    user.role = newRoleId;
  }
}
