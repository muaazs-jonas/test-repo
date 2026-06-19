import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { UserListComponent } from './features/users/user-list/user-list';
import { RegisterComponent } from './features/auth/register/register';
import { UserFormComponent } from './features/users/user-form/user-form';
import { UserDetailComponent } from './features/users/user-detail/user-detail';
import { authGuard } from './core/guards/auth-guard';
import { ProductFormComponent } from './features/products/product-form/product-form';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'users', component: UserListComponent, canActivate: [authGuard, adminGuard] },
  { path: 'users/add', component: UserFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'users/edit/:email', component: UserFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'products/add', component: ProductFormComponent },
];
