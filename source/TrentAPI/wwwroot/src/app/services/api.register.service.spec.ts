import { TestBed } from '@angular/core/testing';

import { ApiRegisterService } from './api.register.service';

describe('ApiRegisterService', () => {
  let service: ApiRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
