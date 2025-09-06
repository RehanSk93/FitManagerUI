import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Tenant } from './tenant';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly tokenKey = 'auth_token';

  constructor(private http: HttpClient, private tenantService: Tenant) { }

  // Login API call
  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password })
      .pipe(
        tap((response: any) => {
          this.saveToken(response.token);              // save JWT
          this.tenantService.setTenant(response.user.gym_id); // save gym_id
        })
      );
  }

  // Helper: save token manually (optional)
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private loginSuccess(response: any) {
    localStorage.setItem(this.tokenKey, response.token);
    this.tenantService.setTenant(response.user.gym_id);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.tenantService.clearTenant();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  // Decode JWT payload
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  // Current logged-in user info
  getCurrentUser() {
    return this.getDecodedToken();
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    const user = this.getDecodedToken();
    return !!user && Date.now() < user.exp * 1000; // check expiry
  }

}
