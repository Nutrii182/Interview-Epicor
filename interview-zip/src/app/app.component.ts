import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DateFormat } from './interfaces/date-format.interface';
import { selectIsAppInitialized } from './users/stores/users.selectors';
import { checkAppInit } from './users/stores/users.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'interview';
  today: string;

  private readonly store = inject(Store);
  readonly isInitialized$ = this.store.select(selectIsAppInitialized);

  constructor(private dateFormatService: DateFormat) {
    this.today = this.dateFormatService.today();
  }

  ngOnInit(): void {
    this.store.dispatch(checkAppInit());
  }
}
