import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(dni: string, password: string): Observable<any> {
    const body = { dni, password };
    return this.http.post(`${this.apiUrl}/sign-in`, body);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-up`, data);
  }

  isLogged(): boolean {
    return localStorage.getItem('token') !== null;
  }

  saveToken(data: any): void {
    localStorage.setItem('token', JSON.stringify(data));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserData(): any {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }
}