import { TestBed } from '@angular/core/testing';

import { ApiAccommodationService } from './api.accommodation.service';

describe('ApiAccommodationService', () => {
  let service: ApiAccommodationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAccommodationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
