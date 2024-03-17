import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexChuchesComponent } from './index-chuches.component';

describe('IndexChuchesComponent', () => {
  let component: IndexChuchesComponent;
  let fixture: ComponentFixture<IndexChuchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexChuchesComponent]
    });
    fixture = TestBed.createComponent(IndexChuchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
