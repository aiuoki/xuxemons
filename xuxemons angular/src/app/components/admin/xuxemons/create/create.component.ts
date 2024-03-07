import { Component } from '@angular/core';
import { XuxemonService } from '../../../../services/xuxemon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(public xuxemonService: XuxemonService, private router: Router) { }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required])
  });
  
  crearXuxemon() {
    const nombre = this.form.value.nombre;
    const tipo = this.form.value.tipo;
    const archivo = this.form.value.archivo;

    this.xuxemonService.store(nombre, tipo, archivo).subscribe({
      next: value => {
        console.log(value);
        this.router.navigate(['/mostrar-xuxemons']);
      },
      error: err => alert(err)
    });
  }
}
