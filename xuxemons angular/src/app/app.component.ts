import { Component } from '@angular/core';
import { XuxemonService } from './services/xuxemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private xuxemonService: XuxemonService) { }

auth = false;


  xuxemonAleatorio() {
    this.xuxemonService.xuxemonAleatorio().subscribe();
  }
}
