import { Component } from '@angular/core';
import { ChucheService } from 'src/app/services/chuche.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-create-chuche',
  templateUrl: './create-chuche.component.html',
  styleUrls: ['./create-chuche.component.css']
})
export class CreateChucheComponent {
  constructor(private chucheService: ChucheService, private router: Router) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]*$')]),
    archivo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9-.]*$')]),
    puntos: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]),
    precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)])
  });

  errorNombre: string = '';
  errorArchivo: string = '';
  errorPuntos: string = '';
  errorPrecio: string = '';

  checkForm() {
    const nombreControl = this.form.get('nombre');
    if (nombreControl?.hasError('required')) {
      this.errorNombre = 'El nombre no puede estar vacío';
    } else if (nombreControl?.hasError('pattern')) {
      this.errorNombre = 'El nombre solo puede contener letras, números y guiones';
    }

    const archivoControl = this.form.get('archivo');
    if (archivoControl?.hasError('required')) {
      this.errorArchivo = 'El archivo no puede estar vacío';
    } else if (archivoControl?.hasError('pattern')) {
      this.errorArchivo = 'El archivo solo puede contener letras, números y guiones sin espacios';
    }

    const puntosControl = this.form.get('puntos');
    if (puntosControl?.hasError('required')) {
      this.errorPuntos = 'Los puntos no pueden estar vacíos';
    } else if (puntosControl?.hasError('pattern')) {
      this.errorPuntos = 'Los puntos solo pueden contener números';
    } else if (puntosControl?.hasError('min')) {
      this.errorPuntos = 'Los puntos deben ser al menos 1';
    }

    const precioControl = this.form.get('precio');
    if (precioControl?.hasError('required')) {
      this.errorPrecio = 'El precio no puede estar vacío';
    } else if (precioControl?.hasError('pattern')) {
      this.errorPrecio = 'El precio solo puede contener números';
    } else if (precioControl?.hasError('min')) {
      this.errorPrecio = 'El precio debe ser al menos 1';
    }
  }
  
  crearChuche() {
    const nombre = this.form.value.nombre;
    const archivo = this.form.value.archivo;
    const puntos = this.form.value.puntos;
    const precio = this.form.value.precio;

    forkJoin({
      nombreExists: this.chucheService.checkNombreAvailability(nombre),
      archivoExists: this.chucheService.checkArchivoAvailability(archivo)
    }).pipe(
      tap(({ nombreExists, archivoExists }) => {
        if (nombreExists.exists) {
          this.errorNombre = 'El nombre ya está en uso';
          const nombreControl = this.form.get('nombre');
          if (nombreControl) {
            nombreControl.setErrors({ 'exists': true });
            nombreControl.markAsTouched();
          }
        }
        if (archivoExists.exists) {
          this.errorArchivo = 'El archivo ya está en uso';
          const archivoControl = this.form.get('archivo');
          if (archivoControl) {
            archivoControl.setErrors({ 'exists': true });
            archivoControl.markAsTouched();
          }
        }
      })
    ).subscribe({
      next: ({ nombreExists, archivoExists }) => {
        if (!nombreExists.exists && !archivoExists.exists) {
          this.chucheService.store({ nombre, archivo, puntos, precio }).subscribe({
            next: (response) => {
              alert('Chuche creada!');
              this.router.navigate(['/mostrar-chuches']);
            },
            error: (error) => {
              alert('Error al crear la chuche. Por favor, verifica los datos ingresados.');
            }
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
