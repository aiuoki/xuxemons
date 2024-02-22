import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  registrarUsuario(email: string, password: string): Observable<any> {
    return this.http.post("https://reqres.in/api/register", {
      email: email,
      password: password
    }).pipe(
      tap(() => {
        alert("Usuario registrado");
      }),
      catchError((err) => {
        if (err.error && err.error.error === "Missing password") {
          alert("Falta la contraseña");
        } else {
          alert("Error en el registro");
        }
        return of (err);
      })
    );
  }

  loginUsuario(email: string, password: string): Observable<any> {
    return this.http.post("https://reqres.in/api/login", {
      email: email,
      password: password
    }).pipe(
      tap(() => {
        alert("Usuario logueado");
      }),
      catchError((err) => {
        if (err.error && err.error.error === "Missing password") {
          alert("Falta la contraseña");
        } else {
          alert("Error en el login");
        }
        return of (err);
      })
    );
  }
}
