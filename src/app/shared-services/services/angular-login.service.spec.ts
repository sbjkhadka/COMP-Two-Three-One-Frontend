import { TestBed } from '@angular/core/testing';

import { AngularLoginService } from './angular-login.service';

describe('AngularLoginService', () => {
  let service: AngularLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
