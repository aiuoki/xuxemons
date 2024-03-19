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
    caramelosMediano: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]),
    caramelosGrande: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
  });

  ngOnInit() {
    this.parametroService.index().subscribe(
      data => {
        this.parametros = data;
        this.form.setValue({
          tamanio: data.tamanio_xuxemon,
          caramelosMediano: data.puntos_mediano,
          caramelosGrande: data.puntos_grande
        });
      },
      error => console.error(error)
    );
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
    const tamanio_xuxemon = this.form.value.tamanio;
    const puntos_mediano = this.form.value.caramelosMediano;
    const puntos_grande = this.form.value.caramelosGrande;

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
