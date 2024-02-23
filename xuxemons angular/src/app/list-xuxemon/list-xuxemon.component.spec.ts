import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListXuxemonComponent } from './list-xuxemon.component';

describe('ListXuxemonComponent', () => {
  let component: ListXuxemonComponent;
  let fixture: ComponentFixture<ListXuxemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListXuxemonComponent]
    });
    fixture = TestBed.createComponent(ListXuxemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
