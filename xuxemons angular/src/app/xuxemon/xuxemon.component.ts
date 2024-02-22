import { Component, Input } from '@angular/core';
import { Xuxemon } from '../models/xuxemon.model';

@Component({
  selector: 'app-xuxemon',
  templateUrl: './xuxemon.component.html',
  styleUrls: ['./xuxemon.component.css']
})
export class XuxemonComponent {
  @Input() xuxemon: Xuxemon;

  constructor() {
    this.xuxemon = {nombre: "", tipo: "", archivo: ""}
  }

  ngOnInit() {
    if (this.xuxemon && this.xuxemon.archivo) {
      this.xuxemon.tipo = this.xuxemon.tipo.toUpperCase();
      this.xuxemon.archivo = "../../assets/xuxemons/" + this.xuxemon.archivo;
    }
  }
}
