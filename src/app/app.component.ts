import {Component, OnInit} from '@angular/core';
import {AngularLoginService} from './shared-services/angular-login.service';
import {LocalStorageService} from './shared-services/local-storage.service';
import {ThemeService} from './shared-services/theme.service';
import {FormGroup} from '@angular/forms';
import {SessionStorageService} from './shared-services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'COMP-Two-Three-One-Frontend';
  loggedInUser;
  theme: string;
  fg: FormGroup;
  constructor(private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService,
              private themeService: ThemeService,
              private sessionStorageService: SessionStorageService) {

  }
  color = document.documentElement.style.getPropertyValue('--mainColor');
  ngOnInit(): void {
    this.loggedInUser =  JSON.parse(sessionStorage.getItem('logged_in_user'));
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
