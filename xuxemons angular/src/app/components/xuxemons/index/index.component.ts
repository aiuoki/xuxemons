import { Component } from '@angular/core';
import { XuxemonService } from '../../../services/xuxemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  xuxemons: any[] = [];

  constructor(private xuxemonService: XuxemonService, private router: Router) { }

  ngOnInit() {
    this.xuxemonService.index().subscribe(
      data => this.xuxemons = data,
      error => console.error(error)
    );
  }

  editarXuxemon(id: number) {
    this.router.navigate(['/editar-xuxemon', id]);
  }

  eliminarXuxemon(id: number) {
    this.xuxemonService.destroy(id).subscribe(
      () => this.xuxemons = this.xuxemons.filter(xuxemon => xuxemon.id !== id),
      error => console.error(error)
    );
  }
}
