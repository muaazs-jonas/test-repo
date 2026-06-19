import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // If they are an admin, let them pass
  if (authService.isAdmin()) {
    return true;
  }

  // If they are a standard user, silently redirect them back to the dashboard
  return router.parseUrl('/dashboard');
};
