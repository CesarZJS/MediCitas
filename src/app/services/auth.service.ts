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
    if (dni === 'admin' && password === '1234') {
    const adminData = { dni: 'admin', role: 'admin', token: 'fake-jwt-token' };
    this.saveToken(adminData);

    return new Observable(observer => {
      observer.next({ code: 0, data: adminData, message: 'Login exitoso' });
      observer.complete();
    });
  }
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