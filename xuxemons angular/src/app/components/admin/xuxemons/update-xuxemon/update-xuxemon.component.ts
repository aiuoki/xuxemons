import { Component } from '@angular/core';
import { XuxemonService } from 'src/app/services/xuxemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of, tap } from 'rxjs';

@Component({
  selector: 'app-update-xuxemon',
  templateUrl: './update-xuxemon.component.html',
  styleUrls: ['./update-xuxemon.component.css']
})
export class UpdateXuxemonComponent {
  oldNombre: string = '';
  oldArchivo: string = '';

  constructor(private route: ActivatedRoute, private xuxemonService: XuxemonService, private router: Router) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  xuxemon: any;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]*$')]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9-.]*$')])
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.xuxemonService.show(+id).subscribe(
        data => {
          this.xuxemon = data;
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
      this.errorNombre = 'El nombre solo puede contener letras, números y guiones';
    }

    const archivoControl = this.form.get('archivo');
    if (archivoControl?.hasError('required')) {
      this.errorArchivo = 'El archivo no puede estar vacío';
    } else if (archivoControl?.hasError('pattern')) {
      this.errorArchivo = 'El archivo solo puede contener letras, números y guiones sin espacios';
    }
  }

  editarXuxemon() {
    const id = this.xuxemon.id;
    const nombre = this.form.value.nombre;
    const tipo = this.form.value.tipo;
    const archivo = this.form.value.archivo;

    const nombreExists$ = nombre !== this.oldNombre ? this.xuxemonService.checkNombreAvailability(nombre) : of({ exists: false });
    const archivoExists$ = archivo !== this.oldArchivo ? this.xuxemonService.checkArchivoAvailability(archivo) : of({ exists: false });

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
          this.xuxemonService.update(id, { nombre, tipo, archivo }).subscribe({
            next: (response) => {
              alert('Xuxemon actualizado!');
              this.router.navigate(['/mostrar-xuxemons']);
            },
            error: (error) => {
              alert('Error al actualizar el xuxemon. Por favor, verifica los datos ingresados.');
            }
          });
        }
      },
      error: err => console.log(err)
    });
  }
}
