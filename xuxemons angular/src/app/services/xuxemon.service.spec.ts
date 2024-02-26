import { TestBed } from '@angular/core/testing';

import { XuxemonService } from './xuxemon.service';

describe('XuxemonService', () => {
  let service: XuxemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XuxemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
