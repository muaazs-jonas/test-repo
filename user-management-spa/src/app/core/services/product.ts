import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5255/api/products';

  products = signal<any[]>([]);

  loadProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to load products', err),
    });
  }

  addProduct(productData: any) {
    return this.http.post<any>(this.apiUrl, productData).pipe(
      tap((newProduct) => {
        this.products.update((currentList) => [newProduct, ...currentList]);
      }),
    );
  }
}
