import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XuxemonService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get(`${this.apiUrl}/xuxemons`, { headers: this.headers });
  }

  show(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/xuxemons/${id}`, { headers: this.headers });
  }

  store(xuxemon: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/xuxemons`, xuxemon, { headers: this.headers });
  }

  update(id: number, xuxemon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/xuxemons/${id}`, xuxemon, { headers: this.headers });
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/xuxemons/${id}`, { headers: this.headers });
  }

  checkNombreAvailability(nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/xuxemon/check-nombre`, { nombre }, { headers: this.headers });
  }

  checkArchivoAvailability(archivo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/xuxemon/check-archivo`, { archivo }, { headers: this.headers });
  }

  xuxemonAleatorio(): Observable<any> {
    return this.http.get(`${this.apiUrl}/xuxemonAleatorio`, { headers: this.headers });
  }
  
  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
