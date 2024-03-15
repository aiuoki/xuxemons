import { Component } from '@angular/core';
import { XuxemonService } from 'src/app/services/xuxemon.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-create-xuxemon',
  templateUrl: './create-xuxemon.component.html',
  styleUrls: ['./create-xuxemon.component.css']
})
export class CreateXuxemonComponent {
  constructor(private xuxemonService: XuxemonService, private router: Router) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z-]*$')]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required, Validators.pattern('^[a-z.]*$')])
  });

  errorNombre: string = '';
  errorArchivo: string = '';

  checkForm() {
    const nombreControl = this.form.get('nombre');
    if (nombreControl?.hasError('required')) {
      this.errorNombre = 'El nombre no puede estar vacío';
    } else if (nombreControl?.hasError('pattern')) {
      this.errorNombre = 'El nombre solo puede contener letras y guiones';
    }

    const archivoControl = this.form.get('archivo');
    if (archivoControl?.hasError('required')) {
      this.errorArchivo = 'El archivo no puede estar vacío';
    } else if (archivoControl?.hasError('pattern')) {
      this.errorArchivo = 'El archivo solo puede contener letras minúsculas y puntos';
    }
  }
  
  crearXuxemon() {
    const nombre = this.form.value.nombre;
    const tipo = this.form.value.tipo;
    const archivo = this.form.value.archivo;

    forkJoin({
      nombreExists: this.xuxemonService.checkNombreAvailability(nombre),
      archivoExists: this.xuxemonService.checkArchivoAvailability(archivo)
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
          this.xuxemonService.store({ nombre, tipo, archivo }).subscribe({
            next: (response) => {
              alert('Xuxemon creado!');
              this.router.navigate(['/mostrar-xuxemons']);
            },
            error: (error) => {
              alert('Error al crear el xuxemon. Por favor, verifica los datos ingresados.');
            }
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
