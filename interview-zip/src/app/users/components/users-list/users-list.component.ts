import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Role } from '../../../roles/models/role.model';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UsersActions from '../../stores/users.actions';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ConfirmDialogComponent],
  template: `
    <div class="users-list">

    @if (loading) {
      <div class="loading">Cargando usuarios...</div>
    } @else {
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
            <td>{{ user.role }}</td>
            <td>
              <button (click)="onEditingUser(user)" class="btn-primary">Editar</button>
              <button (click)="openDeleteDialog(user.id)" class="btn-danger">Eliminar</button>
            </td>
          </tr>
          @if (users?.length === 0) {
            <tr>
              <td colspan="5" class="empty">No hay usuarios registrados.</td>
            </tr>
          }
        </tbody>
      </table>

      <app-confirm-dialog
        [isOpen]="isDialogOpen"
        title="Eliminar usuario"
        message="¿Estás seguro de eliminar este usuario?"
        (confirm)="onConfirmDelete()"
        (cancel)="closeDialog()">
      </app-confirm-dialog>
    }

    </div>
  `,
  styles: `
    .users-list { width: 100%; }
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
  @Input() loading: boolean | null = false;
  @Input() users: User[] | null = [];
  @Output() delete = new EventEmitter<number>();
  editingRole: Role | null = null;

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  isDialogOpen = false;
  userToDeleteId: number | null = null;

  onEditingUser(user: User): void {
    console.log(user);
    this.store.dispatch(UsersActions.isEditing({ isEditing: true }));
    this.router.navigate(['/usuarios/editar', user.id]);
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.userToDeleteId = null;
  }

  openDeleteDialog(id: number | undefined): void {
    if (id !== undefined) {
      this.userToDeleteId = id;
      this.isDialogOpen = true;
    }
  }

  onConfirmDelete(): void {
    if (this.userToDeleteId !== null) {
      this.store.dispatch(UsersActions.deleteUser({ id: this.userToDeleteId }));
    }
    this.closeDialog();
  }

}
