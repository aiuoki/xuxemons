import { Component } from '@angular/core';
import { MochilaChucheService } from 'src/app/services/mochila-chuche.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent {
  chuches: any[];

  constructor(public mochilaChucheService: MochilaChucheService) { }

  ngOnInit() {
    const user_id = JSON.parse(localStorage.getItem('user') || '{}').id || 0;
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
