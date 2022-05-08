import { Component, OnInit } from '@angular/core';
import { AngularLoginService } from 'src/app/shared-services/angular-login.service';
import { LocalStorageService } from 'src/app/shared-services/local-storage.service';
import { SessionStorageService } from 'src/app/shared-services/session-storage.service';
import { ThemeService } from 'src/app/shared-services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUser;
  theme: string;
  constructor(private themeService: ThemeService,
              private sessionStorageService: SessionStorageService,
              private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('logged_in_user'));

    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });

    this.themeService.themeColor.subscribe(value => {
      document.documentElement.style.setProperty('--mainColor', value);
    });
  }

  logout(): any {
    sessionStorage.removeItem('logged_in_user');
    this.sessionStorageService.removeToken();
    this.sessionStorageService.removeRefreshToken();
    this.angularLoginService.logout();
    this.localStorageService.removeItem('quantity');
    this.localStorageService.removeItem('selectedRecipe');
  }

  switchTheme(): void {
    this.themeService.switchTheme();
    document.documentElement.style.getPropertyValue('--mainColor');
  }

  colorChanged(event: any): void {
    this.themeService.changeThemeColor(event);
  }

  switchToDefaultTheme(): void {
    this.themeService.changeThemeColor(this.themeService.getDefaultThemeColor());
  }

}
