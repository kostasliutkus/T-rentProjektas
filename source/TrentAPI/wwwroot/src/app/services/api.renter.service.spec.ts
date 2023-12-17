import { TestBed } from '@angular/core/testing';

import { ApiRenterService } from './api.renter.service';

describe('ApiRenterService', () => {
  let service: ApiRenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
