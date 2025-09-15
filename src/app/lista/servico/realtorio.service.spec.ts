import { TestBed } from '@angular/core/testing';

import { RealtorioService } from './realtorio.service';

describe('RealtorioService', () => {
  let service: RealtorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
