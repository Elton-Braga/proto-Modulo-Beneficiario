import { TestBed } from '@angular/core/testing';

import { BuscaBeneficiarioService } from './busca-beneficiario.service';

describe('BuscaBeneficiarioService', () => {
  let service: BuscaBeneficiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaBeneficiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
