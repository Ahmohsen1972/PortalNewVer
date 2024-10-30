import { TestBed } from '@angular/core/testing';

import { IthmaarPortalService } from './ithmaar-portal.service';

describe('IthmaarPortalService', () => {
  let service: IthmaarPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IthmaarPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
