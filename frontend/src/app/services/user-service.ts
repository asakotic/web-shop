import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:8080/api/users/login';
  private registerUrl = 'http://localhost:8080/api/users/register';
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(this.registerUrl, { email, password });
  }
}
