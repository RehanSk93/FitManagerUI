import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: Auth, private router: Router) { }

  canActivate(): boolean {
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();

    // Token + User exist
    if (token && user) {
      return true;
    }

    // Otherwise redirect to login
    this.router.navigate(['/auth/login']);
    return false;
  }
}
