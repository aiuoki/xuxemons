import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('access_token');
  }

  esAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.rol === 'admin';
  }

  xuxemonAleatorio() {
    // this.xuxemonService.xuxemonAleatorio().subscribe(() => {
    //   alert('Xuxemon aleatorio asignado a cada usuario');
    // });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      alert('Sesión cerrada');
    });
  }
}
