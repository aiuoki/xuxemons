import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMainComponent } from './user-main.component';

describe('UserMainComponent', () => {
  let component: UserMainComponent;
  let fixture: ComponentFixture<UserMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMainComponent]
    });
    fixture = TestBed.createComponent(UserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
