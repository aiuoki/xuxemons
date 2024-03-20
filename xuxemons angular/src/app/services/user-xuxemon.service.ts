import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserXuxemonService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  constructor(private http: HttpClient) { }

  xuxemonsUsuario(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/xuxemonsUsuario/${user_id}`, { headers: this.headers });
  }

  xuxemonUsuario(user_id: number, xuxemon_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/xuxemonUsuario/${user_id}/${xuxemon_id}`, { headers: this.headers });
  }

  alimentarXuxemonUsuario(mochilaChucheId: number, userXuxemonId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/alimentarXuxemonUsuario/${mochilaChucheId}/${userXuxemonId}`, { headers: this.headers });
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
