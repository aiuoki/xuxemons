import { Component } from '@angular/core';
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
        console.log(data);
      },
      error => console.error(error)
    );
  }
}
