import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private compraInventario = `${environment.apiUrl}/compra_inventario`;
  private detalleCompraInventario = `${environment.apiUrl}/detalle_compra_inventario`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getCompraParte(): Observable<Inventario[]>{
    return this.http.get<Inventario[]>(this.detalleCompraInventario, {
      headers: this.getAuthHeaders()
    });
  }

  addParte(nombreParte: Inventario): Observable<Inventario>{
    return this.http.post<Inventario>(this.compraInventario, nombreParte, {
      headers: this.getAuthHeaders()
    });
  }

  updateParte(parte: Inventario): Observable<Inventario>{
    return this.http.put<Inventario>(`${this.compraInventario}/${parte.nombreParte}`, parte, {
      headers: this.getAuthHeaders()
    });
  }
}
