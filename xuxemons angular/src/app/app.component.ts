import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

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
