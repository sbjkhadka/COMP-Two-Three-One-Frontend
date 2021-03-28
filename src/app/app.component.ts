import { Component } from '@angular/core';
import {ActiveUserSingletonService} from './shared-services/active-user-singleton.service';
import {BehaviorSubject} from 'rxjs';
import {FirebaseService} from './shared-services/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'COMP-Two-Three-One-Frontend';

  loggedInUser;
  loggedInUserDetails;
  constructor(public activeUserSingletonService: ActiveUserSingletonService,
              public firebaseService: FirebaseService) {


    this.activeUserSingletonService.activeUser.subscribe(user => {
      console.log('changed', user);
      this.loggedInUser = user;
    });

    this.activeUserSingletonService.activeUserDetails.subscribe(userDetails => {
      this.loggedInUserDetails = userDetails;
    });

  }

  logout(): any {
    localStorage.removeItem('user');
    this.activeUserSingletonService.activeUser.next(null);
    this.activeUserSingletonService.activeUserDetails.next(null);
    this.activeUserSingletonService.activeUserRecipe.next(null);
    this.activeUserSingletonService.activeUserSelectedRecipe.next([]);
    this.firebaseService.logOut();
  }
}
