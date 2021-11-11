import {Component, OnInit} from '@angular/core';
import {FirebaseService} from './shared-services/services/firebase.service';
import {AngularLoginService} from './shared-services/services/angular-login.service';
import {LocalStorageService} from './shared-services/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'COMP-Two-Three-One-Frontend';
  loggedInUser;
  constructor(public firebaseService: FirebaseService,
              private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService) {

  }

  ngOnInit(): void {
    this.loggedInUser =  JSON.parse(localStorage.getItem('logged_in_user'));
  }

  logout(): any {
    localStorage.removeItem('logged_in_user');
    this.localStorageService.removeToken();
    this.localStorageService.removeRefreshToken();
    this.angularLoginService.logout();
  }
}
