import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const editUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = route.paramMap.get('id') ? Number(route.paramMap.get('id')) : null;

  if (userId && !isNaN(userId) && userId > 10) {
    router.navigate(['/usuarios']);
    return false;
  }
  return true;
};
  