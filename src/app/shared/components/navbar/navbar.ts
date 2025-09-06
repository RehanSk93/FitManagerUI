import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(private authService: Auth, private router: Router) { }

  logout() {
    this.authService.logout();            // clears token + tenant
    this.router.navigate(['/auth/login']); // redirect to login page
  }

  // Optional helper to display current user name
  get userName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }

}
