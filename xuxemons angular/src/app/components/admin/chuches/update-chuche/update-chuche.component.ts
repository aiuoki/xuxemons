import { Component } from '@angular/core';
import { ChucheService } from 'src/app/services/chuche.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-update-chuche',
  templateUrl: './update-chuche.component.html',
  styleUrls: ['./update-chuche.component.css']
})
export class UpdateChucheComponent {
  oldNombre: string = '';
  oldArchivo: string = '';

  constructor(private route: ActivatedRoute, private chucheService: ChucheService, private router: Router) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  chuche: any;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]*$')]),
    archivo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9-.]*$')]),
    puntos: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]),
    precio: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)])
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.chucheService.show(+id).subscribe(
        data => {
          this.chuche = data;
          this.oldNombre = data.nombre;
          this.oldArchivo = data.archivo;
          this.form.setValue({
            nombre: data.nombre,
            archivo: data.archivo,
            puntos: data.puntos,
            precio: data.precio
          });
        },
        error => console.error(error)
      );
    }
  }

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

  editarChuche() {
    const id = this.chuche.id;
    const nombre = this.form.value.nombre;
    const archivo = this.form.value.archivo;
    const puntos = this.form.value.puntos;
    const precio = this.form.value.precio;

    const nombreExists$ = nombre !== this.oldNombre ? this.chucheService.checkNombreAvailability(nombre) : of({ exists: false });
    const archivoExists$ = archivo !== this.oldArchivo ? this.chucheService.checkArchivoAvailability(archivo) : of({ exists: false });

    forkJoin({
      nombreExists: nombreExists$,
      archivoExists: archivoExists$
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
          this.chucheService.update(id, { nombre, archivo, puntos, precio }).subscribe({
            next: (response) => {
              alert('Chuche actualizada!');
              this.router.navigate(['/mostrar-chuches']);
            },
            error: (error) => {
              alert('Error al actualizar la chuche. Por favor, verifica los datos ingresados.');
            }
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
