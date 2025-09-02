import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email = '';
  password = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(users => {
        if (users.length > 0) {
          // login success
          localStorage.setItem('token', 'fake-jwt-token'); // simple token
          localStorage.setItem('user', JSON.stringify(users[0])); // store logged-in user
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid email or password');
        }
      }, err => {
        console.error(err);
        alert('Login failed!');
      });
    } else {
      alert('Email and password are required');
    }
  }
}
