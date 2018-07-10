import { TestBed, inject } from '@angular/core/testing';

import { DealershipService } from './dealership.service';

describe('DealershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DealershipService]
    });
  });

  it('should be created', inject([DealershipService], (service: DealershipService) => {
    expect(service).toBeTruthy();
  }));
});
