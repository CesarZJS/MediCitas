import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(usuario: string, password: string): boolean {
    if (usuario === 'admin' && password === '1234') {
      localStorage.setItem('token', 'true');
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return localStorage.getItem('token') === 'true';
  }

  logout() {
    localStorage.removeItem('token');
  }
}