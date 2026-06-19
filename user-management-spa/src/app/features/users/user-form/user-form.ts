import { Component, OnInit, inject } from '@angular/core'; // 1. Added OnInit
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // 2. Added ActivatedRoute
import { UserService } from '../../../core/services/user';
import { Auth } from '../../../core/services/auth'; // Import your Auth service to update active session state if needed

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.html',
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // 3. Inject ActivatedRoute

  // State trackers
  isEditMode = false;
  editingEmail = '';
  errorMessage = '';

  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    // 4. Check if an email parameter exists in the active URL path
    const emailParam = this.route.snapshot.paramMap.get('email');

    if (emailParam) {
      this.isEditMode = true;
      this.editingEmail = emailParam;

      // Find the user details from our reactive signal array
      const existingUser = this.userService.users().find((u) => u.email === emailParam);

      if (existingUser) {
        // Pre-populate the input fields with existing values
        this.userForm.patchValue({
          name: existingUser.name,
          email: existingUser.email,
          password: existingUser.password,
        });

        // Lock the email field so they can't change their primary identifier key
        this.userForm.get('email')?.disable();
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.getRawValue();

      if (this.isEditMode) {
        // HTTP PUT (Edit)
        const userId = this.userService.users().find((u) => u.email === this.editingEmail)?.id;

        // Ensure userId is defined before sending the request
        if (userId) {
          this.userService.updateUser(userId, userData).subscribe({
            next: () => {
              const activeSession = this.authService.currentUser();

              // If the person editing the profile is the same person who is logged in...
              if (activeSession && activeSession.email === this.editingEmail) {
                // Keep their ID and Email, but update their Name in the active session
                const updatedSession = { ...activeSession, name: userData.name };

                // Instantly update the Signal (which updates the Dashboard) and LocalStorage
                this.authService.currentUser.set(updatedSession);
                localStorage.setItem('currentUser', JSON.stringify(updatedSession));
              }

              this.router.navigate(['/users']);
            },
            error: (err) => {
              console.error(err);
              this.errorMessage = 'Failed to update user.';
            },
          });
        }
      } else {
        // HTTP POST (Add)
        this.userService.addUser(userData).subscribe({
          next: () => this.router.navigate(['/users']),
          error: (err) => {
            console.error(err);
            this.errorMessage = 'A user with this email already exists.';
          },
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
