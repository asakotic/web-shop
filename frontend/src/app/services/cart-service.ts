import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialCart();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  private loadInitialCart(): void {
    this.getCart().subscribe({
      next: (items) => {
        this.cartItemsSubject.next(items);
        console.log('Cart initialized', items);
      },
      error: (err) => console.error('Failed to load cart', err)
    });
    
  }

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  updateItemQuantity(itemId: number, newQuantity: number): Observable<any> {
    const updateQuantityReq = {
      quantity: newQuantity
    };

    return this.http.put(`${this.apiUrl}/item/${itemId}`, updateQuantityReq, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => {
        this.loadInitialCart();
      }),
      catchError(error => {
        console.error('Error updating item quantity', error);
        throw error;
      })
    );
  }

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item/${itemId}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(() => this.loadInitialCart()),
      catchError(error => {
        console.error('Error removing item from cart', error);
        throw error;
      })
    );
  }

  getTotalItems(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.quantity, 0
    );
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (item.price * item.quantity), 0
    );
  }
}