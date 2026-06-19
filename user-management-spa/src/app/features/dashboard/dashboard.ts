import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../core/services/auth';
import { UserService } from '../../core/services/user';
import { ProductService } from '../../core/services/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  // 2. Add implements OnInit
  private authService = inject(Auth);
  private userService = inject(UserService);

  currentUser = this.authService.currentUser;
  totalUsers = computed(() => this.userService.users().length);

  productService = inject(ProductService);

  ngOnInit() {
    this.userService.loadUsers();
    this.productService.loadProducts();
  }
}
