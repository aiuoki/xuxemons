import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChucheComponent } from './create-chuche.component';

describe('CreateChucheComponent', () => {
  let component: CreateChucheComponent;
  let fixture: ComponentFixture<CreateChucheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateChucheComponent]
    });
    fixture = TestBed.createComponent(CreateChucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
