import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { rolesReducer } from './roles/store/roles.reducer';
import { RolesEffects } from './roles/store/roles.effects';
import { DateFormat } from './interfaces/date-format.interface';
import { DateFormatService } from './date-format.service';
import { UsDateFormatService } from './us-date-format.service';
import { UsersEffects } from './users/stores/users.effects';
import { usersReducer } from './users/stores/users.reducer';
import { customHeaderInterceptor } from './core/custom-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([customHeaderInterceptor])
    ),
    { provide: DateFormat, useClass: DateFormatService },
    provideStore({ roles: rolesReducer, users: usersReducer }),
    provideEffects([RolesEffects, UsersEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),    
  ]
};
