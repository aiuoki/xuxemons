import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XuxemonService } from '../../../../services/xuxemon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  oldNombre: string = '';
  oldArchivo: string = '';

  constructor(private route: ActivatedRoute, public xuxemonService: XuxemonService, private router: Router) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  xuxemon: any;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.xuxemonService.show(+id).subscribe(
        data => {
          this.xuxemon = data;
          // Asignar los valores actuales a las nuevas propiedades
          this.oldNombre = data.nombre;
          this.oldArchivo = data.archivo;
          this.form.setValue({
            nombre: data.nombre,
            tipo: data.tipo,
            archivo: data.archivo
          });
        },
        error => console.error(error)
      );
    }
  }

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

  editarXuxemon() {
    const id = this.xuxemon.id;
    const nombre = this.form.value.nombre;
    const tipo = this.form.value.tipo;
    const archivo = this.form.value.archivo;

    forkJoin({
      nombreExists: nombre !== this.oldNombre ? this.xuxemonService.comprobarNombre(nombre) : of({ exists: false }),
      archivoExists: archivo !== this.oldArchivo ? this.xuxemonService.comprobarArchivo(archivo) : of({ exists: false })
    }).pipe(
      tap(({ nombreExists, archivoExists }) => {
        if (nombreExists.exists) {
          this.errorNombre = 'El nombre ya está en uso';
          const nombreControl = this.form.get('nombre');
          if (nombreControl) {
            nombreControl.setErrors({ 'exists': true });
            nombreControl.markAsTouched(); // Forzar la actualización de la vista
          }
        }
        if (archivoExists.exists) {
          this.errorArchivo = 'El archivo ya está en uso';
          const archivoControl = this.form.get('archivo');
          if (archivoControl) {
            archivoControl.setErrors({ 'exists': true });
            archivoControl.markAsTouched(); // Forzar la actualización de la vista
          }
        }
      })
    ).subscribe({
      next: ({ nombreExists, archivoExists }) => {
        if (!nombreExists.exists && !archivoExists.exists) {
          this.xuxemonService.update(id, nombre, tipo, archivo).subscribe({
            next: value => {
              console.log(value);
              this.router.navigate(['/mostrar-xuxemons']); // Redirige al usuario
            },
            error: err => console.log(err)
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
