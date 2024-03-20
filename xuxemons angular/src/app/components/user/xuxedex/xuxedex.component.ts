import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MochilaChucheService } from 'src/app/services/mochila-chuche.service';
import { UserXuxemonService } from 'src/app/services/user-xuxemon.service';

@Component({
  selector: 'app-xuxedex',
  templateUrl: './xuxedex.component.html',
  styleUrls: ['./xuxedex.component.css']
})
export class XuxedexComponent {
  xuxemons: any[];
  chuches: any[];

  constructor(public userXuxemonService: UserXuxemonService, public mochilaChucheService: MochilaChucheService) { }

  ngOnInit() {
    const user_id = JSON.parse(localStorage.getItem('user') || '{}').id || 0;
    this.userXuxemonService.xuxemonsUsuario(user_id).subscribe(
      data => {
        this.xuxemons = Array.isArray(data.xuxemons) ? data.xuxemons : [data.xuxemons];
        this.xuxemons = this.xuxemons.map((xuxemon, index) => ({
          ...xuxemon,
          archivo: `../../assets/xuxemons/${xuxemon.archivo}`,
          tamanio: xuxemon.pivot.tamanio
        }));
        console.log(data);
      },
      error => console.error(error)
    );

    // ------------
    this.mochilaChucheService.chuchesMochila(user_id).subscribe(
      data => {
        this.chuches = Array.isArray(data.chuches) ? data.chuches : [data.chuches];
        this.chuches = this.chuches.map((chuche, index) => ({
          ...chuche,
          archivo: `../../assets/chuches/${chuche.archivo}`,
          cantidad: chuche.pivot.cantidad
        }));
      },
      error => console.error(error)
    );
  }

  form: FormGroup = new FormGroup({
    id_xuxemon: new FormControl('', Validators.required),
    id_chuche: new FormControl('', Validators.required)
  });

  alimentarXuxemon() {
    const id_xuxemon = this.form.value.id_xuxemon;
    const id_chuche = this.form.value.id_chuche;
    console.log(id_xuxemon, id_chuche);

    this.userXuxemonService.alimentarXuxemonUsuario(id_chuche, id_xuxemon).subscribe({
      next: (response) => {
        alert('Xuxemon alimentado!');
        this.ngOnInit();
      },
      error: (error) => {
        alert('Error al alimentar el xuxemon.');
      }
    });
  }
}
