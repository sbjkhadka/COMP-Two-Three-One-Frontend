import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared-services/services/firebase.service';
import {RecipeServiceService} from '../../shared-services/recipe-service.service';
import {ActiveUserSingletonService} from '../../shared-services/active-user-singleton.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-my-recipe-list',
  templateUrl: './my-recipe-list.component.html',
  styleUrls: ['./my-recipe-list.component.css']
})
export class MyRecipeListComponent implements OnInit {

  loggedInUser;
  constructor(
    public firebaseService: FirebaseService,
    public recipeServiceService: RecipeServiceService,
    public activeUserSingletonService: ActiveUserSingletonService,
    public dialog: MatDialog) {
    this.confirmUserLoginAfterPageReload();
  }

  ngOnInit(): void {
  }
  confirmUserLoginAfterPageReload(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedInUser) {
      this.activeUserSingletonService.activeUser.next(this.loggedInUser.uid);
      this.activeUserSingletonService.activeUserDetails.next(this.loggedInUser);
      // this.getAllRecipes(this.loggedInUser.uid);
    }
  }

}
