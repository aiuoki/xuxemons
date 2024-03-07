import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  comprobarNick(nick: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/users/nick/${nick}`);
  }
  
  comprobarEmail(email: string): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/users/email/${email}`);
  }

  registrarUsuario(nombre:string, apellidos:string, nick:string, email: string, password: string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/users", {
      nombre: nombre,
      apellidos: apellidos,
      nick: nick,
      email: email,
      password: password
    });
  }

  loginUsuario(email: string, password: string): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/auth", {
      email: email,
      password: password
    });
  }
}
