import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarXuxemonComponent } from './editar-xuxemon.component';

describe('EditarXuxemonComponent', () => {
  let component: EditarXuxemonComponent;
  let fixture: ComponentFixture<EditarXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarXuxemonComponent]
    });
    fixture = TestBed.createComponent(EditarXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
