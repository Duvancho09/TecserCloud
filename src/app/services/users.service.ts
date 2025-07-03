import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.apiUrl}/auth/register`;
  private getUsersAlls = `${environment.apiUrl}/usuarios`;
  private getRolId = `${environment.apiUrl}/usuario_rol`

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders{
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRolIdByUsuario(usuarioId: number): Observable<Users>{
    const url = `${this.getRolId}/${usuarioId}`;
    return this.http.get<Users>(url, {
      headers: this.getAuthHeaders()
    });
  }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.getUsersAlls, {
      headers: this.getAuthHeaders()
    });
  }

  addUserNew(usuario: Users): Observable<Users>{
    return this.http.post<Users>(this.baseUrl, usuario, {
      headers: this.getAuthHeaders()
    });
  }

  deleteUser(rolID: string): Observable<void>{
    return this.http.delete<void>(`${this.getUsersAlls}/${rolID}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateUser(user: Users): Observable<Users>{
    return this.http.put<Users>(`${this.getUsersAlls}/${user.nombreCompleto}`, user, {
      headers: this.getAuthHeaders()
    });
  }
}
