import { TestBed, async, inject } from '@angular/core/testing';

import { ControllerGuard } from './controller.guard';

describe('ControllerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControllerGuard]
    });
  });

  it('should ...', inject([ControllerGuard], (guard: ControllerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
