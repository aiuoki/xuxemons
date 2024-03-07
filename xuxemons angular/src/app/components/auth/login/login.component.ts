import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public usuarioService: UsuarioService) { }

  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  });
  
  loginUsuario() {
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;

    this.usuarioService.loginUsuario(email, password).subscribe({
      next: value => console.log(value),
      error: err => alert(err)
    });
  }
}
