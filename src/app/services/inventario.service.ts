import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario.model';
import { HistorialPartes } from '../models/historialPartes.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private baseUrl = `${environment.apiUrl}/detalles-compra`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getInventario(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  addParte(nombreParte: Inventario): Observable<Inventario>{
    return this.http.post<Inventario>(this.baseUrl, nombreParte, {
      headers: this.getAuthHeaders()
    });
  }

  updateParte(parte: Inventario): Observable<Inventario>{
    return this.http.put<Inventario>(`${this.baseUrl}/${parte.nombreParte}`, parte, {
      headers: this.getAuthHeaders()
    });
  }
}
