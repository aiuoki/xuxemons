import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  constructor(public usuarioService: UsuarioService, private router: Router) {
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
    if (nickControl) {
      if (nickControl.hasError('required')) {
        this.errorNick = 'El nick no puede estar vacío';
      } else if (nickControl.hasError('pattern')) {
        this.errorNick = 'El nick solo puede contener letras y números';
      } else {
        this.errorNick = '';
      }
    }
  
    const emailControl = this.formRegister.get('email');
    if (emailControl) {
      if (emailControl.hasError('required')) {
        this.errorEmail = 'El email no puede estar vacío';
      } else if (emailControl.hasError('email')) {
        this.errorEmail = 'El email debe ser válido';
      } else {
        this.errorEmail = '';
      }
    }
  
    if (this.formRegister.hasError('notSame')) {
      this.errorPassword2 = 'Las contraseñas deben coincidir';
    }
  }
  
  registrarUsuario() {
    const nombre = this.formRegister.value.nombre;
    const apellidos = this.formRegister.value.apellidos;
    const nick = this.formRegister.value.nick;
    const email = this.formRegister.value.email;
    const password = this.formRegister.value.password;
  
    forkJoin({
      nickExists: this.usuarioService.comprobarNick(nick),
      emailExists: this.usuarioService.comprobarEmail(email)
    }).pipe(
      tap(({ nickExists, emailExists }) => {
        if (nickExists.exists) {
          this.errorNick = 'El nick ya está en uso';
          const nickControl = this.formRegister.get('nick');
          if (nickControl) {
            nickControl.setErrors({ 'exists': true });
            nickControl.markAsTouched(); // Forzar la actualización de la vista
          }
        }
        if (emailExists.exists) {
          this.errorEmail = 'El email ya está en uso';
          const emailControl = this.formRegister.get('email');
          if (emailControl) {
            emailControl.setErrors({ 'exists': true });
            emailControl.markAsTouched(); // Forzar la actualización de la vista
          }
        }
      })
    ).subscribe({
      next: ({ nickExists, emailExists }) => {
        if (!nickExists.exists && !emailExists.exists) {
          this.usuarioService.registrarUsuario(nombre, apellidos, nick, email, password).subscribe({
            next: value => {
              console.log(value);
              this.router.navigate(['/xuxemons']); // Redirige al usuario
            },
            error: err => console.log(err)
          });
        }
      },
      error: err => console.log(err)
    });
  }
}