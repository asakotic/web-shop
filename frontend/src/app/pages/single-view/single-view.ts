import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-single-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './single-view.html',
  styleUrls: ['./single-view.scss']
})
export class SingleView implements OnInit {
  product!: Product | null;
  isLoading = false;
  quantity = 1;
  selectedImage = '';
  specEntries: { key: string, value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProduct(id);
    }
  }

  fetchProduct(id: string): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = {
          ...res,
          images: res.images.map(img => `http://localhost:8080/${img}`)
        };
        this.selectedImage = this.product.images[0];
        this.specEntries = Object.entries(this.product.technicalSpecifications || {})
          .map(([key, value]) => ({ key, value }));
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.product = null;
        this.isLoading = false;
      }
    });
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
  addToCart(product: Product): void {
  this.productService.addToCart(product.id.toString(), 1).subscribe({
    next: (response) => {
      if (response.success) {
        alert(response.message); 
      } else {
        alert(response.message); 
      }
    },
    error: (err) => {
      console.error('HTTP error:', err);
      alert('Network or server error occurred');
    }
  });
}
}
