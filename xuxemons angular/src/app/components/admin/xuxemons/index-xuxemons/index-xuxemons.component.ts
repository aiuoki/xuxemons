import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Xuxemon } from 'src/app/models/xuxemon.model';
import { XuxemonService } from 'src/app/services/xuxemon.service';

@Component({
  selector: 'app-index-xuxemons',
  templateUrl: './index-xuxemons.component.html',
  styleUrls: ['./index-xuxemons.component.css']
})
export class IndexXuxemonsComponent {
  xuxemons: Xuxemon[] = [];

  constructor(public xuxemonService: XuxemonService, private router: Router) { }

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
    if (window.confirm('Eliminar Xuxemon?')) {
      this.xuxemonService.destroy(id).subscribe(
        () => this.xuxemons = this.xuxemons.filter(xuxemon => xuxemon.id !== id),
        error => console.error(error)
      );
    }
  }
}
