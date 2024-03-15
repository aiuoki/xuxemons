import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public authService: AuthService, private router: Router) {
    this.formLogin.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });

  errorEmail: string = '';
  errorUsuario: string = '';

  checkForm() {
    const emailControl = this.formLogin.get('email');
    if (emailControl) {
      if (emailControl.hasError('required')) {
        this.errorEmail = 'El email no puede estar vacío';
      } else if (emailControl.hasError('email')) {
        this.errorEmail = 'El email debe ser válido';
      } else {
        this.errorEmail = '';
      }
    }
  }
  
  loginUsuario() {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        alert('Login correcto!');
        this.router.navigate(['/xuxemons']);
      },
      error: (error) => {
        alert('Usuario o contraseña incorrectos.');
      }
    });
  }
}
