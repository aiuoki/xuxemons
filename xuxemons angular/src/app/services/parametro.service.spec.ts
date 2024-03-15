import { TestBed } from '@angular/core/testing';

import { ParametroService } from './parametro.service';

describe('ParametroService', () => {
  let service: ParametroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
