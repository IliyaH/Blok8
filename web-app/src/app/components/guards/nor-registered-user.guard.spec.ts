import { TestBed, async, inject } from '@angular/core/testing';

import { NorRegisteredUserGuard } from './nor-registered-user.guard';

describe('NorRegisteredUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NorRegisteredUserGuard]
    });
  });

  it('should ...', inject([NorRegisteredUserGuard], (guard: NorRegisteredUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
