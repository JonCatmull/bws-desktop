import { TestBed, inject } from '@angular/core/testing';

import { TalonService } from './talon.service';

describe('TalonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TalonService]
    });
  });

  it('should be created', inject([TalonService], (service: TalonService) => {
    expect(service).toBeTruthy();
  }));
});
