import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Check if we have a real JWT token saved
  const token = localStorage.getItem('token');

  // 2. If we do, attach it to the request headers
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  // 3. If there is no token (like on the login page), just send the request as normal
  return next(req);
};
