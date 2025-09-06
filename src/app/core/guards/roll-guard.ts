import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class RollGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router) { }

canActivate(route: ActivatedRouteSnapshot): boolean {
  const allowedRoles = route.data['roles'] as string[] | undefined;
  const user = this.authService.getCurrentUser();

  // User not logged in → send to login
  if (!user) {
    this.router.navigate(['/auth/login']);
    return false;
  }

  // If route has no role restrictions → allow
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  // Role check
  if (allowedRoles.includes(user.role)) {
    return true;
  }

  // Role mismatch → redirect to dashboard home
  this.router.navigate(['/unauthorized']);
  return false;
}

}

