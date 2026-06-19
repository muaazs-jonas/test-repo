import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
// Update this path based on where your service actually is
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
