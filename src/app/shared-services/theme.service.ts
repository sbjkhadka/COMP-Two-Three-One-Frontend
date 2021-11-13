import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private localStorageService: LocalStorageService) {
    const theme = this.localStorageService.getItem('theme');
    if (theme) {
      this.theme.next(theme);
    } else {
      this.theme.next('color');
      this.localStorageService.setItem('theme', 'color');
    }
    this.localStorageService.getItem('theme');
  }

  theme = new BehaviorSubject<string>('color');

  switchTheme(): void {
    if (this.theme.getValue() === 'color') {
      this.theme.next('dark');
      this.localStorageService.setItem('theme', 'dark');
    } else if (this.theme.getValue() === 'dark') {
      this.theme.next('color');
      this.localStorageService.setItem('theme', 'color');
    } else {
      this.theme.next('color');
      this.localStorageService.setItem('theme', 'color');
    }
  }
}
