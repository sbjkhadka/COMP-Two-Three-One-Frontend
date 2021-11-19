import {Component, HostListener, OnInit} from '@angular/core';
import {FirebaseService} from './shared-services/services/firebase.service';
import {AngularLoginService} from './shared-services/services/angular-login.service';
import {LocalStorageService} from './shared-services/services/local-storage.service';
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
  constructor(public firebaseService: FirebaseService,
              private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService,
              private themeService: ThemeService,
              private sessionStorageService: SessionStorageService) {

  }
  color = document.documentElement.style.getPropertyValue('--mainColor');
  // @HostListener('window:onbeforeunload', ['$event'])
  // clearLocalStorage(event): void{
  //   alert('hello');
  //   this.localStorageService.removeToken();
  //   this.localStorageService.removeRefreshToken();
  //   this.localStorageService.logout();
  // }
  ngOnInit(): void {
    // this.loggedInUser =  JSON.parse(localStorage.getItem('logged_in_user'));
    this.loggedInUser =  JSON.parse(sessionStorage.getItem('logged_in_user'));
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });

    this.themeService.themeColor.subscribe(value => {
      document.documentElement.style.setProperty('--mainColor', value);
    });
  }

  logout(): any {
    // localStorage.removeItem('logged_in_user');
    sessionStorage.removeItem('logged_in_user');
    // this.localStorageService.removeToken();
    // this.localStorageService.removeRefreshToken();
    // this.angularLoginService.logout();
    this.sessionStorageService.removeToken();
    this.sessionStorageService.removeRefreshToken();
    this.angularLoginService.logout();
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
