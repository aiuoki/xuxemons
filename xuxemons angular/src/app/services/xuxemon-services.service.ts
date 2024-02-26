import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Xuxemon } from '../models/xuxemon.model';
@Injectable({
  providedIn: 'root'
})
export class XuxemonServicesService {
  constructor(private http: HttpClient) { }

  GetXuxemons(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons`);
  }

  GetXuxemonById(id: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/xuxemons/${id}`);
  }

  UpdateXuxemonById(nombre:string,tipo:string,archivo:string , id:number): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons/${id}` , {
      nombre:nombre,
      tipo:tipo,
      archivo:archivo
    }).pipe(
      tap(() => {
        alert("Xuxemon actualizado");
      }),
      catchError((err) => {
        alert("Error en el registro");
        return of (err);
      })
    );
  }

  CrearXuxemon(nombre:string,tipo:string,archivo:string ): Observable<any> {
    return this.http.put(`http://127.0.0.1:8000/api/xuxemons` , {
      nombre:nombre,
      tipo:tipo,
      archivo:archivo
    }).pipe(
      tap(() => {
        alert("Xuxemon creado");
      }),
      catchError((err) => {
        alert("Error en el registro");
        return of (err);
      })
    );
  }

  DeleteXuxemon(id:number ): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8000/api/xuxemons/${id}`).pipe(
    tap(() => {
      alert("Xuxemon borrado");
    }),
    catchError((err) => {
      alert("Error en el registro");
      return of (err);
    })
  );
  }
}
