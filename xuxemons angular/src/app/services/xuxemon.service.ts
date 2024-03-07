import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XuxemonService {
  constructor(private http: HttpClient) { }

  comprobarNombre(nombre: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/nombre/${nombre}`);
  }

  comprobarArchivo(archivo: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/archivo/${archivo}`);
  }

  index(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/xuxemons");
  }

  show(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/${id}`);
  }

  store(nombre:string, tipo:string, archivo:string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/xuxemons", {
      nombre: nombre,
      tipo: tipo,
      archivo: archivo
    });
  }

  update(id: number, nombre: string, tipo: string, archivo: string): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, {
      nombre: nombre,
      tipo: tipo,
      archivo: archivo
    });
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`);
  }
  
  xuxemonAleatorio(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/xuxemon/aleatorio");
  }
}
