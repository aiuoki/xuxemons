import { Component } from '@angular/core';
import xuxemons from '../../assets/json/xuxemons.json';
import { Xuxemon } from '../models/xuxemon.model';

@Component({
  selector: 'app-xuxemon',
  templateUrl: './xuxemon.component.html',
  styleUrls: ['./xuxemon.component.css']
})
export class XuxemonComponent {
  xuxemons: Xuxemon[] = xuxemons.map((xuxemon, index) => ({
    id: index,
    ...xuxemon, 
    tipo: xuxemon.tipo.toUpperCase(),
    archivo: `../../assets/xuxemons/${xuxemon.archivo}`
  }));
}