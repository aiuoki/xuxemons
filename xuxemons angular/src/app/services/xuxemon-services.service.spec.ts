import { TestBed } from '@angular/core/testing';

import { XuxemonServicesService } from './xuxemon-services.service';

describe('XuxemonServicesService', () => {
  let service: XuxemonServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XuxemonServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
