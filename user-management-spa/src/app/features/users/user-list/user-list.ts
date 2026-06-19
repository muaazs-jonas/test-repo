import { Component, OnInit, inject } from '@angular/core'; // 1. Import OnInit
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user';
import { Auth } from '../../../core/services/auth';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(50px)' })),
      ]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  private authService = inject(Auth);

  ngOnInit(): void {
    this.userService.loadUsers();
  }

  deleteUser(id: number): void {
    const currentUser = this.authService.currentUser();
    if (currentUser && currentUser.id === id) {
      alert('You cannot delete your own account!');
      return;
    }
    if (confirm(`Delete user?`)) {
      this.userService.deleteUser(id);
    }
  }
}
