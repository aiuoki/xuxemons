import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XuxemonService {
  constructor(private http: HttpClient) { }

  index(): Observable<any> {
    return this.http.get("http://127.0.0.1:8000/api/xuxemons").pipe(
      tap(() => {
        console.log("Xuxemons retrieved");
      }),
      catchError((err) => {
        console.log("Error retrieving xuxemons");
        return of(err);
      })
    );
  }

  show(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/${id}`).pipe(
      tap(() => {
        console.log("Xuxemon retrieved");
      }),
      catchError((err) => {
        console.log("Error retrieving xuxemon");
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
      tap(() => {
        alert("Xuxemon creado");
      }),
      catchError((err) => {
        alert("Error al crear el xuxemon");
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
      tap(() => {
        alert("Xuxemon actualizado");
      }),
      catchError((err) => {
        alert("Error al actualizar el xuxemon");
        return of(err);
      })
    );
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`).pipe(
      tap(() => {
        alert("Xuxemon eliminado");
      }),
      catchError((err) => {
        alert("Error al eliminar el xuxemon");
        return of(err);
      })
    );
  }
}
