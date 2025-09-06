import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tenant {

  private readonly tenantKey = 'gym_id';

  // Save gym_id when user logs in
  setTenant(gymId: string): void {
    localStorage.setItem(this.tenantKey, gymId)
  }

  getTenant(): string | null {
    return localStorage.getItem(this.tenantKey);
  }

  // Remove tenant info on logout
  clearTenant(): void {
    localStorage.removeItem(this.tenantKey);
  }

}
