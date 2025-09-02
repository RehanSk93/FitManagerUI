import { Component } from '@angular/core';
import { Auth, User } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  user: User = { name: '', email: '', phone: '', password: '' };

  constructor(private authService: Auth, private router: Router) { }

  onRegister() {
    if (this.user.name && this.user.email && this.user.phone && this.user.password) {
      this.authService.register(this.user).subscribe(() => {
        alert('Registration successful!');
        this.router.navigate(['/auth/login']);
      }, err => {
        console.error(err);
        alert('Registration failed!');
      });
    } else {
      alert('All fields are required!');
    }
  }
}
