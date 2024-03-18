import { Component } from '@angular/core';
import { UserXuxemonService } from 'src/app/services/user-xuxemon.service';

@Component({
  selector: 'app-xuxedex',
  templateUrl: './xuxedex.component.html',
  styleUrls: ['./xuxedex.component.css']
})
export class XuxedexComponent {
  xuxemons: any[];

  constructor(public userXuxemonService: UserXuxemonService) { }

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
  }
}
