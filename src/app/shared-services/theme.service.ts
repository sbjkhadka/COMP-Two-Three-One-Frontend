import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {baseColor} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  theme = new BehaviorSubject<string>('color');
  themeColor = new BehaviorSubject<string>('themeColor');
  defaultThemeColor = baseColor;

  constructor(private localStorageService: LocalStorageService) {
    const themeLS = this.localStorageService.getItem('theme');
    const themeColorLS = this.localStorageService.getItem('themeColor');
    if (themeLS) {
      this.theme.next(themeLS);
    } else {
      this.theme.next('color');
      this.localStorageService.setItem('theme', 'color');
    }

    if (themeColorLS) {
      this.themeColor.next(themeColorLS);
    } else {
      const currentColor = document.documentElement.style.getPropertyValue('--mainColor');
      this.themeColor.next(currentColor);
      this.localStorageService.setItem('themeColor', currentColor);
    }
  }

  switchTheme(): void {
    if (this.theme.getValue() === 'color') {
      this.theme.next('dark');
      this.localStorageService.setItem('theme', 'dark');
    } else if (this.theme.getValue() === 'dark') {
      this.theme.next('color');
      this.localStorageService.setItem('theme', 'color');
    }
  }

  changeThemeColor(color: any): void {
    this.themeColor.next(color);
    this.localStorageService.setItem('themeColor', color);
  }

  getDefaultThemeColor(): any {
    this.themeColor.next(this.defaultThemeColor);
    this.localStorageService.setItem('themeColor', this.defaultThemeColor);
    return this.defaultThemeColor;
  }
}
