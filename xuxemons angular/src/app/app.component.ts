import { Component } from '@angular/core';
import xuxemons from '../assets/json/xuxemons.json';
import { Xuxemon } from './models/xuxemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  xuxemons: Xuxemon[] = [];

  ngOnInit() {
    const json = xuxemons as unknown;
    this.xuxemons = json as Xuxemon[];
  }
}
