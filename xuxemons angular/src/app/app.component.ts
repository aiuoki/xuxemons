import { Component } from '@angular/core';
import { XuxemonService } from './services/xuxemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private xuxemonService: XuxemonService) { }

  xuxemonAleatorio() {
    this.xuxemonService.xuxemonAleatorio().subscribe(() => {
      alert('Xuxemon aleatorio asignado a cada usuario');
    });
  }
}
