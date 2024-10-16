import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenDeTrabajo } from '../Model/OrdenDeTrabajo';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class OrdenDeTrabajoService {
  private apiUrl = 'http://localhost:8080/api/ordenes'; // Ajusta la URL si es necesario

  constructor(private http: HttpClient, private authService: AuthService ) { }

  private agregarTokenAHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  crearOrden(ordenDeTrabajo: OrdenDeTrabajo): Observable<OrdenDeTrabajo> {
    const headers = this.agregarTokenAHeaders();
    return this.http.post<OrdenDeTrabajo>(`${this.apiUrl}/crear`, ordenDeTrabajo, { headers });
  }

  obtenerOrden(id: number): Observable<OrdenDeTrabajo> {
    const headers = this.agregarTokenAHeaders();
    return this.http.get<OrdenDeTrabajo>(`${this.apiUrl}/${id}`, { headers });
  }

  listarOrdenes(): Observable<OrdenDeTrabajo[]> {
    return this.http.get<OrdenDeTrabajo[]>(`${this.apiUrl}/listar`, {
      headers: { Authorization: `Bearer ${this.authService.getToken()}` }
    });
  }
}
