import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services/cart-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  displayedColumns: string[] = ['productName', 'price', 'quantity', 'total', 'actions'];

  constructor(private cartService: CartService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.cd.detectChanges();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQuantity(quantity: number, productId: number): void {
    const newQuantity = quantity + 1;
    this.cartService.updateItemQuantity(Number(productId), newQuantity).pipe(
      switchMap(() => this.cartService.getCart())
    ).subscribe({
      next: (items) => {
        this.cartItems = items;
      },
      error: () => {
        console.error('Error updating quantity');
      }
    });
  }


  decreaseQuantity(quantity: number, productId: number): void {
    if (quantity > 1) {
      const newQuantity = quantity - 1;

      this.cartService.updateItemQuantity(Number(productId), newQuantity).subscribe({
        next: () => {
          this.cartService.getCart().subscribe(items => {
            this.cartItems = items;
            this.cd.detectChanges();
          });
          console.log('Decreased quantity for product', productId, 'to', newQuantity);
        },
        error: () => {
          this.cartService.getCart().subscribe();
        }
      });
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(Number(item.productId)).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
        this.refreshCart();
      },
      error: (err) => {
        console.error('Error removing item:', err);
      }
    });
}

private refreshCart(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
}
}