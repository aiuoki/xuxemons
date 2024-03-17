import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent {
  monedas: number;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.authService.userMochila(user.id).subscribe((mochila: any) => {
      this.monedas = mochila.monedas;
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      alert('Sesión cerrada');
      this.router.navigate(['/login']);
    });
  }
}
