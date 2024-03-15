import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateXuxemonComponent } from './update-xuxemon.component';

describe('UpdateXuxemonComponent', () => {
  let component: UpdateXuxemonComponent;
  let fixture: ComponentFixture<UpdateXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateXuxemonComponent]
    });
    fixture = TestBed.createComponent(UpdateXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
