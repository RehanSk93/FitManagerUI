import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  ownerName = '';
  email = '';
  password = '';
  gymName = '';
  gymAddress = '';

  constructor(private http: HttpClient, private router: Router) { }

  onRegister() {
    const payload = {
      ownerName: this.ownerName,
      email: this.email,
      password: this.password,
      gymName: this.gymName,
      gymAddress: this.gymAddress
    };

    this.http.post('/api/auth/register', payload)
      .subscribe({
        next: () => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => console.error('Registration failed', err)
      });
  }


}
