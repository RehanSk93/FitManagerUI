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
  loading = false;
  errorMessage = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) { }

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.loading = false;
        console.log('Login-', response);
        
        // Redirect based on role
        const role = response.user.role;
        if (role === 'admin') this.router.navigate(['/dashboard/admin']);
        else if (role === 'trainer') this.router.navigate(['/dashboard/trainer']);
        else if (role === 'receptionist') this.router.navigate(['/dashboard/receptionist']);
        else this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password';
      }
    })
  }
}
