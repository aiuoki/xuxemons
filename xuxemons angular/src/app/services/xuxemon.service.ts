import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XuxemonService {
  constructor(private http: HttpClient) { }

  comprobarNombre(nombre: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/nombre/${nombre}`).pipe(
      catchError((err) => {
        return of(err.error);
      })
    );
  }

  comprobarArchivo(archivo: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/archivo/${archivo}`).pipe(
      catchError((err) => {
        return of(err.error);
      })
    );
  }

  index(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/xuxemons").pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  show(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/${id}`).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  store(nombre:string, tipo:string, archivo:string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/xuxemons", {
      nombre: nombre,
      tipo: tipo,
      archivo: archivo
    }).pipe(
      catchError((err) => {
        return of (err);
      })
    );
  }

  update(id: number, nombre: string, tipo: string, archivo: string): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}`, {
      nombre: nombre,
      tipo: tipo,
      archivo: archivo
    }).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }
  
  xuxemonAleatorio(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/xuxemon/aleatorio").pipe(
      tap(() => {
        alert("Xuxemon aleatorio asignado a cada usuario");
      }),
      catchError((err) => {
        alert("Error al asignar xuxemon aleatorio a cada usuario");
        return of(err);
      })
    );
  }
}
