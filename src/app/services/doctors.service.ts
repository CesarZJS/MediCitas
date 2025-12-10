import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Obtener todos los doctores
  getAllDoctors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`);
  }

  // Obtener un doctor por ID
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${id}`);
  }

  // Registrar doctor
  registerDoctor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-doctors`, data);
  }

  // Actualizar doctor
  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/doctors/${id}`, data);
  }

  // Eliminar doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/doctors/${id}`);
  }
}