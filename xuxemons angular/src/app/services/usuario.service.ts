import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
    usuarioLogueado(): boolean {
      return localStorage.getItem('token') !== null;
    }
  registrarUsuario(nombre:string, apellidos:string, nick:string, email: string, password: string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/users", {
      nombre: nombre,
      apellidos: apellidos,
      nick: nick,
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
    return this.http.post<LoginResponse>("http://127.0.0.1:8000/api/auth", {
      email: email,
      password: password
    }).pipe(
      tap((res) => {
        alert("Usuario logueado");
        localStorage.setItem('token', res.token);

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
