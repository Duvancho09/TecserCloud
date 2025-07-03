import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiculoRegister = `${environment.apiUrl}/vehiculos/ingreso`;
  private getVehiculosAll = `${environment.apiUrl}/vehiculos`;
  
  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.getVehiculosAll, {
      headers: this.getAuthHeaders()
    });
  }

  addVehiculo(vehiculoData: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(this.vehiculoRegister, vehiculoData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteVehiculo(placa: string): Observable<void>{
    return this.http.delete<void>(`${this.vehiculoRegister}/${placa}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(`${this.vehiculoRegister}/${vehiculo.placa}`, vehiculo, {
      headers: this.getAuthHeaders()
    });
  }
}
