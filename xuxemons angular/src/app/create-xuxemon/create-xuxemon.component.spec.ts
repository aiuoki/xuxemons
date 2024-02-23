import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateXuxemonComponent } from './create-xuxemon.component';

describe('CreateXuxemonComponent', () => {
  let component: CreateXuxemonComponent;
  let fixture: ComponentFixture<CreateXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateXuxemonComponent]
    });
    fixture = TestBed.createComponent(CreateXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
