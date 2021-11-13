import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  theme = new BehaviorSubject<string>('color');

  switchTheme(): void {
    if (this.theme.getValue() === 'color') {
      this.theme.next('dark');
    } else if (this.theme.getValue() === 'dark') {
      this.theme.next('color');
    } else {
      this.theme.next('color');
    }
  }
}
