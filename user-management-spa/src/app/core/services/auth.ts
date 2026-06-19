import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  // Point this to your .NET API URL
  private apiUrl = 'http://localhost:5255/api/auth';

  currentUser = signal<any>(this.getUserFromStorage());
  isLoggedIn = computed(() => this.currentUser() !== null);

  isAdmin = computed(() => {
    const user = this.currentUser();
    return user !== null && user.role === 'Admin';
  });

  private getUserFromStorage() {
    const userString = localStorage.getItem('currentUser');
    return userString ? JSON.parse(userString) : null;
  }

  // Returns an Observable that the component can subscribe to
  register(user: any) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        // 1. Save the secure JWT token for the Interceptor to use
        localStorage.setItem('token', response.token);

        // 2. Save the user details (Id, Name, Email) for the UI
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUser.set(null);
  }
}
