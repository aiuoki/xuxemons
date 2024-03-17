import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chuche } from 'src/app/models/chuche.model';
import { ChucheService } from 'src/app/services/chuche.service';

@Component({
  selector: 'app-index-chuches',
  templateUrl: './index-chuches.component.html',
  styleUrls: ['./index-chuches.component.css']
})
export class IndexChuchesComponent {
  chuches: Chuche[] = [];

  constructor(public chucheService: ChucheService, private router: Router) { }

  ngOnInit() {
    this.chucheService.index().subscribe(
      data => this.chuches = data,
      error => console.error(error)
    );
  }

  editarChuche(id: number) {
    this.router.navigate(['/editar-chuche', id]);
  }

  eliminarChuche(id: number) {
    if (window.confirm('Eliminar Chuche?')) {
      this.chucheService.destroy(id).subscribe(
        () => this.chuches = this.chuches.filter(chuche => chuche.id !== id),
        error => console.error(error)
      );
    }
  }
}
