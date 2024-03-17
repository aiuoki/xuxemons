import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChucheComponent } from './update-chuche.component';

describe('UpdateChucheComponent', () => {
  let component: UpdateChucheComponent;
  let fixture: ComponentFixture<UpdateChucheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateChucheComponent]
    });
    fixture = TestBed.createComponent(UpdateChucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
