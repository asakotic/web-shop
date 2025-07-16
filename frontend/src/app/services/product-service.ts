import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse, Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private apiCartUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

getProducts(search: string, page: number, size: number, sort: string): Observable<PaginatedResponse<Product>> {
  const params = new HttpParams()
    .set('search', search || '')
    .set('page', page.toString())
    .set('size', size.toString())
    .set('sort', sort);

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  });

  return this.http.get<PaginatedResponse<Product>>(this.apiUrl, { params, headers });
}

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeader()
    });
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const body = { productId, quantity };
    return this.http.post(`${this.apiCartUrl}/add`, body, {
      headers: this.getAuthHeader()
    });
  }
}