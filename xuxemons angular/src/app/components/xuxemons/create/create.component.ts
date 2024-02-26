import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(public usuarioService: UsuarioService) { }

  formLogin: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required])
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
