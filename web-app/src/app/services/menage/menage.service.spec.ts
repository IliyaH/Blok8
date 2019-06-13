import { TestBed } from '@angular/core/testing';

import { MenageService } from './menage.service';

describe('MenageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenageService = TestBed.get(MenageService);
    expect(service).toBeTruthy();
  });
});
