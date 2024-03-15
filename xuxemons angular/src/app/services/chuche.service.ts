import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChucheService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chuches`, { headers: this.headers });
  }

  show(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chuches/${id}`, { headers: this.headers });
  }

  store(xuxemon: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chuches`, xuxemon, { headers: this.headers });
  }

  update(id: number, xuxemon: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/chuches/${id}`, xuxemon, { headers: this.headers });
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/chuches/${id}`, { headers: this.headers });
  }

  checkNombreAvailability(nombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chuche/check-nombre`, { nombre }, { headers: this.headers });
  }

  checkArchivoAvailability(archivo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/chuche/check-archivo`, { archivo }, { headers: this.headers });
  }
  
  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
