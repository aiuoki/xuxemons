import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ParametrosService {
  constructor(private http: HttpClient) { }

  show(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/parametros/${id}`);
  }

  update(id: number, tamanio: string, caramelosMediano: number, caramelosGrande: number): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/parametros/${id}`, {
      tamanio_xuxemon: tamanio,
      caramelos_mediano: caramelosMediano,
      caramelos_grande: caramelosGrande
    });
  }
}
