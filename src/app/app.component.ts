import {Component, OnInit} from '@angular/core';
import {ActiveUserSingletonService} from './shared-services/active-user-singleton.service';
import {BehaviorSubject} from 'rxjs';
import {FirebaseService} from './shared-services/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'COMP-Two-Three-One-Frontend';

  loggedInUser;
  loggedInUserDetails;
  loggedInUserDetailsDB;
  constructor(public activeUserSingletonService: ActiveUserSingletonService,
              public firebaseService: FirebaseService) {


    // this.activeUserSingletonService.activeUser.subscribe(user => {
    //   console.log('changed', user);
    //   this.loggedInUser = user;
    // });

    // this.activeUserSingletonService.activeUserDetails.subscribe(userDetails => {
    //   this.loggedInUserDetails = userDetails;
    //   console.log('LOGGED_IN_USER_DETAILS', this.loggedInUserDetails);
    // });
    // this.activeUserSingletonService.activeUserDetailsFromDB.subscribe(activeUserFromDB => {
    //   console.log('FROM_DB', activeUserFromDB);
    //   this.loggedInUserDetailsDB = activeUserFromDB;
    // });

  }

  ngOnInit(): void {
    this.loggedInUser =  JSON.parse(localStorage.getItem('logged_in_user'));
  }

  logout(): any {
    localStorage.removeItem('user');
    localStorage.removeItem('selectedRecipe');
    localStorage.removeItem('quantity');
    this.activeUserSingletonService.activeUser.next(null);
    this.activeUserSingletonService.activeUserDetails.next(null);
    this.activeUserSingletonService.activeUserRecipe.next(null);
    this.activeUserSingletonService.activeUserSelectedRecipe.next([]);
    this.firebaseService.logOut();
  }
}
