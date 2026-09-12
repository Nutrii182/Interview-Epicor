import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="dialog-backdrop">
        <div class="dialog-card">
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>

          <div class="actions">
            <button type="button" class="btn-cancel" (click)="onCancel()">
              Cancelar
            </button>
            <button type="button" class="btn-confirm" (click)="onConfirm()">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      font-family: sans-serif;
    }

    .dialog-card {
      background: #f9f9f9;
      padding: 1.5rem;
      border-radius: 8px;
      width: 90%;
      max-width: 420px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    h3 { color: #3f51b5; margin: 0 0 1rem 0; font-size: 1.25rem;}
    p { color: #333; font-size: 0.95rem; line-height: 1.4; margin: 0 0 1.5rem 0; }
    .actions { display: flex; justify-content: flex-end; gap: 0.5rem; }

    button {
      padding: 0.5rem 1.2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: #3f51b5;
      color: #fff;
      font-size: 0.95rem;
    }

    button:hover { opacity: 0.9;}
    .btn-cancel { background: #e53935;}
  `]
})
export class ConfirmDialogComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Estás seguro de que deseas eliminar este elemento?';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}