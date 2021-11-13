import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import {LocalStorageService} from './services/local-storage.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
      providers: [
        ThemeService,
        {provide: LocalStorageService, useValue: mockLocalStorageService}

      ]
    }
    );
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
const mockLocalStorageService = {
  getItem: () => true,
  setItem: () => {}
};
