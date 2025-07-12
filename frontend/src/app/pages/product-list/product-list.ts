import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime, finalize, Subject } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductList implements OnInit {
  products: Product[] = [];
  totalItems = 0;
  isLoading = false;
  isGridView = true;

  searchTerm = '';
  searchSubject = new Subject<string>();

  page = 0;
  size = 10;
  sort = 'name,asc';

  sizes = [5, 10, 15, 20];

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.page = 0;
      this.loadProducts();
    });
    this.loadProducts();
  }


  loadProducts(): void {
    this.isLoading = true;
    this.cd.detectChanges(); // RUČNO osvežavanje UI posle promene

    this.productService.getProducts(this.searchTerm, this.page, this.size, this.sort)
      .subscribe(res => {
        this.products = res.content.map(product => ({
          ...product,
          images: product.images.map(img => `http://localhost:8080/${img}`)
        }));
        this.totalItems = res.totalElements;

        this.isLoading = false;
        this.cd.detectChanges(); // RUČNO osvežavanje UI posle promene
      });
  }


  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.isLoading = true; // odmah stavi loading na true
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.isLoading = true; // isto ovde
    this.searchSubject.next('');
  }

  changeSort(value: string): void {
    this.sort = value;
    this.page = 0;
    this.loadProducts();
  }

  changeView(): void {
    this.isGridView = !this.isGridView;
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadProducts();
  }
}