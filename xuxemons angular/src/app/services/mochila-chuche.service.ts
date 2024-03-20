import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MochilaChucheService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });

  constructor(private http: HttpClient) { }

  chuchesMochila(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chuchesMochila/${user_id}`, { headers: this.headers });
  }

  chucheMochila(user_id: number, chuche_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/chucheMochila/${user_id}/${chuche_id}`, { headers: this.headers });
  }

  private getToken(): string {
    return localStorage.getItem('access_token') || '';
  }
}
