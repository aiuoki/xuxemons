import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public authService: AuthService, private router: Router) {
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
      }
    }
  
    const emailControl = this.formRegister.get('email');
    if (emailControl) {
      if (emailControl.hasError('required')) {
        this.errorEmail = 'El email no puede estar vacío';
      } else if (emailControl.hasError('email')) {
        this.errorEmail = 'El email debe ser válido';
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
      nickExists: this.authService.checkNickAvailability(nick),
      emailExists: this.authService.checkEmailAvailability(email)
    }).pipe(
      tap(({ nickExists, emailExists }) => {
        if (nickExists.exists) {
          this.errorNick = 'El nick ya está en uso';
          const nickControl = this.formRegister.get('nick');
          if (nickControl) {
            nickControl.setErrors({ 'exists': true });
            nickControl.markAsTouched();
          }
        }
        if (emailExists.exists) {
          this.errorEmail = 'El email ya está en uso';
          const emailControl = this.formRegister.get('email');
          if (emailControl) {
            emailControl.setErrors({ 'exists': true });
            emailControl.markAsTouched();
          }
        }
      })
    ).subscribe({
      next: ({ nickExists, emailExists }) => {
        if (!nickExists.exists && !emailExists.exists) {
          this.authService.register({ nombre, apellidos, nick, email, password }).subscribe({
            next: (response) => {
              alert('Registro exitoso!');
              this.router.navigate(['/xuxedex']);
            },
            error: (error) => {
              alert('Error en el registro. Por favor, verifica los datos ingresados.');
            }
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
