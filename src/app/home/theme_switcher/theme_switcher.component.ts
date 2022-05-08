import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared-services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme_switcher.component.html',
  styleUrls: ['./theme_switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  switchTheme(): void {
    this.themeService.switchTheme();
    document.documentElement.style.getPropertyValue('--mainColor');
  }

}
