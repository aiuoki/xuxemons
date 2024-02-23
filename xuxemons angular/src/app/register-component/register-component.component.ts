import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  constructor(public usuarioService: UsuarioService) { }

  formRegister: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    nick: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    password2: new FormControl('')
  }, { validators: this.checkPasswords });

  checkPasswords(group: AbstractControl) {
    let password = group.get('password')?.value;
    let repetirPassword = group.get('password2')?.value;

    return password === repetirPassword ? null : { notSame: true }   
  }

  registrarUsuario() {
    const nombre = this.formRegister.value.nombre;
    const apellidos = this.formRegister.value.apellidos;
    const nick = this.formRegister.value.nick;
    const email = this.formRegister.value.email;
    const password = this.formRegister.value.password;

    this.usuarioService.registrarUsuario(nombre, apellidos, nick, email, password).subscribe({
      next: value => console.log(value),
      error: err => alert(err)
    });
  }
}
