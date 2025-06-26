import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<any>{
    return this.http.post<any>(this.baseUrl, credentials);
  }

  guardarToken(token: string): void{
    sessionStorage.setItem('authToken', token);
  }

  obtenerToken(): string | null{
    return sessionStorage.getItem('authToken');
  }

  eliminarToken(): void{
    sessionStorage.removeItem('authToken');
  }

  estaLogueado(): boolean{
    return !!this.obtenerToken();
  }
}
