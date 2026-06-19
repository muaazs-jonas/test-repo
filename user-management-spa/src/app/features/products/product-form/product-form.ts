import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../core/services/product';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  animations: [
    trigger('formEntrance', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms cubic-bezier(0.25, 1, 0.5, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
  styles: [
    `
      .form-wrapper {
        display: flex;
        justify-content: center;
        padding: 40px 20px;
      }
      .form-card {
        background: #ffffff;
        padding: 32px;
        border-radius: 12px;
        box-shadow:
          0 10px 25px -5px rgba(0, 0, 0, 0.05),
          0 8px 10px -6px rgba(0, 0, 0, 0.05);
        width: 100%;
        max-width: 500px;
        border: 1px solid #f3f4f6;
      }
      .form-card h2 {
        font-size: 24px;
        font-weight: 700;
        color: #111827;
        margin-bottom: 24px;
        text-align: center;
      }
      .form-label {
        font-weight: 500;
        color: #374151;
        margin-bottom: 6px;
        display: block;
        font-size: 14px;
      }
      .custom-input {
        width: 100%;
        padding: 10px 14px;
        border: 1px solid #d1d5db;
        border-radius: 8px;
        font-size: 15px;
        transition: all 0.2s ease;
        background-color: #f9fafb;
      }
      .custom-input:focus {
        outline: none;
        border-color: #3b82f6;
        background-color: #ffffff;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
      }
      .error-text {
        color: #ef4444;
        font-size: 13px;
        margin-top: 6px;
        display: block;
      }
      .btn-group {
        display: flex;
        gap: 12px;
        margin-top: 32px;
      }
    `,
  ],
  template: `
    <div class="form-wrapper">
      <div class="form-card" @formEntrance>
        <h2>Create New Product</h2>

        <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
          <div style="margin-bottom: 20px;">
            <label class="form-label">Product Name</label>
            <input
              type="text"
              formControlName="name"
              class="custom-input"
              placeholder="e.g., Wireless Headphones"
            />
            <span
              class="error-text"
              *ngIf="productForm.get('name')?.invalid && productForm.get('name')?.touched"
            >
              Name is required (min 2 characters).
            </span>
          </div>

          <div style="margin-bottom: 20px;">
            <label class="form-label">Price ($)</label>
            <input
              type="number"
              step="0.01"
              formControlName="price"
              class="custom-input"
              placeholder="0.00"
            />
            <span
              class="error-text"
              *ngIf="productForm.get('price')?.invalid && productForm.get('price')?.touched"
            >
              Price must be greater than $0.
            </span>
          </div>

          <div style="margin-bottom: 20px;">
            <label class="form-label">Description (Optional)</label>
            <textarea
              formControlName="description"
              class="custom-input"
              rows="4"
              placeholder="Briefly describe the product..."
            ></textarea>
          </div>

          <div class="btn-group">
            <button
              type="submit"
              class="btn btn-primary"
              style="flex: 1;"
              [disabled]="productForm.invalid || isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : 'Publish Product' }}
            </button>
            <button
              type="button"
              routerLink="/dashboard"
              class="btn"
              style="flex: 1; background: #e5e7eb; color: #374151;"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProductFormComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  isSubmitting = false;

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    price: [null, [Validators.required, Validators.min(0.01)]],
    description: ['', [Validators.maxLength(500)]],
  });

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      const formValue = this.productForm.getRawValue();

      this.productService.addProduct(formValue).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => {
          console.error(err);
          alert('Failed to save product.');
          this.isSubmitting = false;
        },
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }
}
