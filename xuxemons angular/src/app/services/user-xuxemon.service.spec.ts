import { TestBed } from '@angular/core/testing';

import { UserXuxemonService } from './user-xuxemon.service';

describe('UserXuxemonService', () => {
  let service: UserXuxemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserXuxemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
