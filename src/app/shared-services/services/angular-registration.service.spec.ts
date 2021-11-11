import { TestBed } from '@angular/core/testing';

import { AngularRegistrationService } from './angular-registration.service';

describe('AngularRegistrationService', () => {
  let service: AngularRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
