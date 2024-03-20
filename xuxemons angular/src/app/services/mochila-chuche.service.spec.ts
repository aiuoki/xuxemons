import { TestBed } from '@angular/core/testing';

import { MochilaChucheService } from './mochila-chuche.service';

describe('MochilaChucheService', () => {
  let service: MochilaChucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MochilaChucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
