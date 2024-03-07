import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  comprobarNick(nick: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/users/nick/${nick}`).pipe(
      catchError((err) => {
        return of(err.error);
      })
    );
  }
  
  comprobarEmail(email: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/users/email/${email}`).pipe(
      catchError((err) => {
        return of(err.error);
      })
    );
  }

  registrarUsuario(nombre:string, apellidos:string, nick:string, email: string, password: string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/users", {
      nombre: nombre,
      apellidos: apellidos,
      nick: nick,
      email: email,
      password: password
    }).pipe(
      catchError((err) => {
        return of(err);
      })
    );
  }

  loginUsuario(email: string, password: string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/auth", {
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
