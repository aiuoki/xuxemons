import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  nickDisponible: boolean = true;
  emailDisponible: boolean = true;

  constructor(public usuarioService: UsuarioService) {
    this.formRegister.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  formRegister: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    apellidos: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    nick: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    password2: new FormControl('')
  }, { validators: this.checkPasswords });

  checkPasswords(group: AbstractControl) {
    let password = group.get('password')?.value;
    let repetirPassword = group.get('password2')?.value;

    return password === repetirPassword ? null : { notSame: true }   
  }

  errorNombre: string = '';
  errorApellidos: string = '';
  errorNick: string = '';
  errorEmail: string = '';
  errorPassword2: string = '';

  checkForm() {
    const nombreControl = this.formRegister.get('nombre');
    if (nombreControl?.hasError('required')) {
      this.errorNombre = 'El nombre no puede estar vacío';
    } else if (nombreControl?.hasError('pattern')) {
      this.errorNombre = 'El nombre solo puede contener letras y espacios';
    }
  
    const apellidosControl = this.formRegister.get('apellidos');
    if (apellidosControl?.hasError('required')) {
      this.errorApellidos = 'Los apellidos no pueden estar vacíos';
    } else if (apellidosControl?.hasError('pattern')) {
      this.errorApellidos = 'Los apellidos solo pueden contener letras y espacios';
    }
  
    const nickControl = this.formRegister.get('nick');
    if (nickControl?.hasError('required')) {
      this.errorNick = 'El nick no puede estar vacío';
    } else if (nickControl?.hasError('pattern')) {
      this.errorNick = 'El nick solo puede contener letras y números';
    } else if (!this.nickDisponible) {
      this.errorNick = 'El nick no está disponible';
    }
  
    const emailControl = this.formRegister.get('email');
    if (emailControl?.hasError('required')) {
      this.errorEmail = 'El email no puede estar vacío';
    } else if (emailControl?.hasError('email')) {
      this.errorEmail = 'El email debe ser válido';
    } else if (!this.emailDisponible) {
      this.errorEmail = 'El email no está disponible';
    }
  
    if (this.formRegister.hasError('notSame')) {
      this.errorPassword2 = 'Las contraseñas deben coincidir';
    }
  }

  comprobarNick() {
    const nick = this.formRegister.value.nick;
    this.usuarioService.comprobarNick(nick).subscribe({
      next: value => { this.nickDisponible = value; },
      error: err => { this.nickDisponible = false; }
    });
  }

  comprobarEmail() {
    const email = this.formRegister.value.email;
    this.usuarioService.comprobarEmail(email).subscribe({
      next: value => { this.emailDisponible = value; },
      error: err => { this.emailDisponible = false; }
    });
  }
  
  registrarUsuario() {
    const nombre = this.formRegister.value.nombre;
    const apellidos = this.formRegister.value.apellidos;
    const nick = this.formRegister.value.nick;
    const email = this.formRegister.value.email;
    const password = this.formRegister.value.password;

    // Comprobamos el nick y el email con las funciones de arriba
    this.comprobarNick();
    this.comprobarEmail();

    if(!this.nickDisponible) {
      console.log("El nick no está disponible");

    }

    if(!this.emailDisponible) {
      console.log("El email no está disponible");
    }

    this.usuarioService.registrarUsuario(nombre, apellidos, nick, email, password).subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    });
  }
}