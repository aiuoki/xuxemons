import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuxemonComponent } from './xuxemon.component';

describe('XuxemonComponent', () => {
  let component: XuxemonComponent;
  let fixture: ComponentFixture<XuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XuxemonComponent]
    });
    fixture = TestBed.createComponent(XuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
