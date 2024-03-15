import { TestBed } from '@angular/core/testing';

import { ChucheService } from './chuche.service';

describe('ChucheService', () => {
  let service: ChucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
