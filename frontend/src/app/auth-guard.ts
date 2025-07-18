import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from './services/user-service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/login'], { 
          queryParams: { returnUrl: state.url } 
        });
      }
      return true;
    })
  );
};