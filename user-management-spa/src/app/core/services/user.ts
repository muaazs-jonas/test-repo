import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5255/api/users';

  users = signal<any[]>([]);

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users.set(data);
      },
      error: (err) => console.error('Failed to load users', err),
    });
  }

  addUser(user: any) {
    return this.http.post('http://localhost:5255/api/auth/register', user);
  }

  updateUser(id: number, updatedData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedData);
  }

  deleteUser(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.users.update((currentUsers) => currentUsers.filter((user) => user.id !== id));
      },
      error: (err) => alert('Failed to delete user.'),
    });
  }
}
