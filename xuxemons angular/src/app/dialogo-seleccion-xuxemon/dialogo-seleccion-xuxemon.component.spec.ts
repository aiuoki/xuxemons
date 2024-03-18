import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoSeleccionXuxemonComponent } from './dialogo-seleccion-xuxemon.component';

describe('DialogoSeleccionXuxemonComponent', () => {
  let component: DialogoSeleccionXuxemonComponent;
  let fixture: ComponentFixture<DialogoSeleccionXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoSeleccionXuxemonComponent]
    });
    fixture = TestBed.createComponent(DialogoSeleccionXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
