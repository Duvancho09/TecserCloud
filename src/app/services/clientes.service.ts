import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private baseUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }
}
