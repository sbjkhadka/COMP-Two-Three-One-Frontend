import { TestBed } from '@angular/core/testing';

import { ActiveUserSingletonService } from './active-user-singleton.service';

describe('ActiveUserSingletonService', () => {
  let service: ActiveUserSingletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveUserSingletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
