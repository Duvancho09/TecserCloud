import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private baseUrl = `${environment.apiUrl}/api/vehiculos`;

  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  addVehiculo(vehiculoData: any){
    return this.http.post(`${environment.apiUrl}/api/vehiculos`, vehiculoData);
  }

  deleteVehiculo(placa: string): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${placa}`);
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.put(`${this.baseUrl}/${vehiculo.placa}`, vehiculo);
  }
}
