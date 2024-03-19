import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParametroService } from 'src/app/services/parametro.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent {
  constructor(private route: ActivatedRoute, public parametroService: ParametroService) {
    this.form.valueChanges.subscribe(() => {
      this.checkForm();
    });
  }

  parametros: any;

  form: FormGroup = new FormGroup({
    tamanio: new FormControl('', [Validators.required, Validators.pattern('^(pequenio|mediano|grande)$')]),
    puntosMediano: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    puntosGrande: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
  });

  ngOnInit() {
    this.parametroService.index().subscribe(
      data => {
        this.parametros = data;
        this.form.setValue({
          tamanio: data.tamanio_xuxemon,
          puntosMediano: data.puntos_mediano,
          puntosGrande: data.puntos_grande
        });
      },
      error => console.error(error)
    );
  }

  errorPuntosMediano: string = '';
  errorPuntosGrande: string = '';

  checkForm() {
    const puntosMedianoControl = this.form.get('puntosMediano');
    if (puntosMedianoControl?.hasError('pattern')) {
      this.errorPuntosMediano = 'El número debe ser un número entero positivo';
    }

    const puntosGrandeControl = this.form.get('puntosGrande');
    if (puntosGrandeControl?.hasError('pattern')) {
      this.errorPuntosGrande = 'El número debe ser un número entero positivo';
    }
  }

  editarParametros() {
    const tamanio_xuxemon = this.form.value.tamanio;
    const puntos_mediano = this.form.value.puntosMediano;
    const puntos_grande = this.form.value.puntosGrande;

    this.parametroService.update({ tamanio_xuxemon, puntos_mediano, puntos_grande }).subscribe({
      next: (response) => {
        alert('Parametros actualizados!');
      },
      error: (error) => {
        alert('Error al actualizar los parametros. Por favor, verifica los datos ingresados.');
      }
    });
  }
}
