import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ParametrosService } from 'src/app/services/parametros.service';


@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent {
  constructor(private route: ActivatedRoute, public parametrosService: ParametrosService) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  parametros: any;

  form: FormGroup = new FormGroup({
    tamanio: new FormControl('', [Validators.required, Validators.pattern('^(pequenio|mediano|grande)$')]),
    caramelosMediano: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    caramelosGrande: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
  });

  ngOnInit() {
    const id = 1;
    if (id !== null) {
      this.parametrosService.show(+id).subscribe(
        data => {
          this.parametros = data;
          this.form.setValue({
            tamanio: data.tamanio_xuxemon,
            caramelosMediano: data.caramelos_mediano,
            caramelosGrande: data.caramelos_grande
          });
        },
        error => console.error(error)
      );
    }
  }

  errorCaramelosMediano: string = '';
  errorCaramelosGrande: string = '';

  checkForm() {
    const caramelosMedianoControl = this.form.get('caramelosMediano');
    if (caramelosMedianoControl?.hasError('pattern')) {
      this.errorCaramelosMediano = 'El número debe ser un número entero positivo';
    }

    const caramelosGrandeControl = this.form.get('caramelosGrande');
    if (caramelosGrandeControl?.hasError('pattern')) {
      this.errorCaramelosGrande = 'El número debe ser un número entero positivo';
    }
  }

  editarParametros() {
    const id = this.parametros.id;
    const tamanio = this.form.value.tamanio;
    const caramelosMediano = this.form.value.caramelosMediano;
    const caramelosGrande = this.form.value.caramelosGrande;

    //
  }
}
