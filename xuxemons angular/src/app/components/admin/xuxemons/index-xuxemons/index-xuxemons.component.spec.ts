import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexXuxemonsComponent } from './index-xuxemons.component';

describe('IndexXuxemonsComponent', () => {
  let component: IndexXuxemonsComponent;
  let fixture: ComponentFixture<IndexXuxemonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexXuxemonsComponent]
    });
    fixture = TestBed.createComponent(IndexXuxemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
