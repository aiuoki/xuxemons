import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XuxemonService } from '../../../services/xuxemon.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  xuxemon: any;

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required, Validators.pattern('^(aire|agua|tierra)$')]),
    archivo: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private xuxemonService: XuxemonService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.xuxemonService.show(+id).subscribe(
        data => {
          this.xuxemon = data;
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

  editarXuxemon() {
    const id = this.xuxemon.id;
    const nombre = this.form.value.nombre;
    const tipo = this.form.value.tipo;
    const archivo = this.form.value.archivo;

    this.xuxemonService.update(id, nombre, tipo, archivo).subscribe({
      next: value => console.log(value),
      error: err => alert(err)
    });
  }
}