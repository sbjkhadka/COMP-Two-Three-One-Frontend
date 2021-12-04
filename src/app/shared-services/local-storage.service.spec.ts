import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should be able to set authentication token', () => {
    service.setToken('ABC123');
    expect(service.getToken()).toBe('ABC123');
  });

  it('should be able to remove authentication token after logout', () => {
    service.removeToken();
    expect(service.removeToken()).toBeFalsy();
  });

  it('should be able to check if the user is logged in', () => {
    service.setToken('ABC123');
    expect(service.isLoggedIn()).toBeTruthy();
    service.removeToken();
    expect(service.isLoggedIn()).toBeFalsy();
  });

  it('should be able to logout the user', () => {
    expect(service.logout()).toBeTruthy();
  });
});
