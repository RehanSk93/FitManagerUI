import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class MockAuthInterceptor implements HttpInterceptor {
  private users: any[] = [
    {
      id: 1,
      ownerName: 'Ravi Kumar',
      email: 'ravi@gym.com',
      password: '123456',
      gymName: 'Powerhouse Fitness',
      gymAddress: 'Kolkata',
      role: 'admin',
      gym_id: 'GYM001',
      token: 'fake-jwt-admin'
    },
    {
      id: 2,
      email: 'staff@gym.com',
      password: '123456',
      role: 'trainer',
      gym_id: 'GYM001',
      token: 'fake-jwt-trainer'
    }
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // ---- LOGIN ----
    if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
      const { email, password } = req.body;
      const user = this.users.find(u => u.email === email && u.password === password);

      if (user) {
        const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJ1c2VySWQiOjEsImVtYWlsIjoicmF2aUBneW0uY29tIiwicm9sZSI6ImFkbWluIiwiZ3ltX2lkIjoiR1lNMDAxIn0.' +
          'fake-signature';

        // return structured response
        return of(new HttpResponse({
          status: 200,
          body: {
            token: fakeToken,
            user: {
              id: user.id,
              email: user.email,
              role: user.role,
              gym_id: user.gym_id,
              ownerName: user.ownerName,
              gymName: user.gymName,
              gymAddress: user.gymAddress
            }
          }
        }));
      } else {
        return throwError(() => ({ status: 401, message: 'Invalid credentials' }));
      }
    }


    // ---- REGISTER ----
    if (req.url.endsWith('/api/auth/register') && req.method === 'POST') {
      const newUser = { ...req.body, id: this.users.length + 1, role: 'admin', token: 'fake-jwt-new' };
      this.users.push(newUser);

      return of(new HttpResponse({ status: 200, body: newUser }));
    }

    // ---- DEFAULT ----
    return next.handle(req);
  }
}
