import { Component } from '@angular/core';
import { XuxemonService } from 'src/app/services/xuxemon.service';
import { ChucheService } from 'src/app/services/chuche.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent {
  constructor(private xuxemonService: XuxemonService, private chucheService: ChucheService, private authService: AuthService, private router: Router) { }

  xuxemonAleatorio() {
    this.xuxemonService.xuxemonAleatorio().subscribe(() => {
      alert('Xuxemon aleatorio asignado a cada usuario');
    });
  }

  chucheAleatoria() {
    this.chucheService.chucheAleatoria().subscribe(() => {
      alert('Chuche aleatoria asignada a cada usuario');
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      alert('Sesión cerrada');
      this.router.navigate(['/login']);
    });
  }
}
