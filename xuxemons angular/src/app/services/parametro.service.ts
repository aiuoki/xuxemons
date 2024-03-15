import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get(`${this.apiUrl}/parametros`, { headers: this.headers });
  }

  update(parametros: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/parametros/1`, parametros, { headers: this.headers });
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
