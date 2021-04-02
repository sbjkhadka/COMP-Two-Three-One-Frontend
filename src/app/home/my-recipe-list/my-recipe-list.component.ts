import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../shared-services/services/firebase.service';
import {RecipeServiceService} from '../../shared-services/recipe-service.service';
import {ActiveUserSingletonService} from '../../shared-services/active-user-singleton.service';
import {MatDialog} from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {MyGroceryListComponent} from './my-grocery-list/my-grocery-list.component';

@Component({
  selector: 'app-my-recipe-list',
  templateUrl: './my-recipe-list.component.html',
  styleUrls: ['./my-recipe-list.component.css']
})
export class MyRecipeListComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public recipeServiceService: RecipeServiceService,
    public activeUserSingletonService: ActiveUserSingletonService,
    public dialog: MatDialog) {
    this.confirmUserLoginAfterPageReload();
    this.recipeList = JSON.parse(localStorage.getItem('selectedRecipe'));
    console.log('recipe_list_in_list', this.recipeList);
    this.initializeQuantity();
  }

  loggedInUser;
  recipeList;
  quantityList = [];

  isDialogOpened = false;

  ngOnInit(): void {
  }

  initializeQuantity(): void {
    // console.log(this.recipeList);
    // console.log('qty_list', JSON.parse(localStorage.getItem('quantity')));
    // this.quantityList = JSON.parse(localStorage.getItem('quantity'));
    // if (this.quantityList && this.quantityList.length > 0) {
    //   console.log('quantity_list_exists', this.quantityList);
    // } else {
      this.quantityList = [];
      for (let i = 0; i < this.recipeList.length; i++) {
        this.quantityList.push({
          recipeId: this.recipeList[i].recipeId,
          quantity: 1
        });
      }
      localStorage.setItem('quantity', JSON.stringify(this.quantityList));
    // }

  }

  confirmUserLoginAfterPageReload(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedInUser) {
      this.activeUserSingletonService.activeUser.next(this.loggedInUser.uid);
      this.activeUserSingletonService.activeUserDetails.next(this.loggedInUser);
    }
  }



  pleaseGiveMeQuantity(item): number {
    if (this.quantityList && this.quantityList.length > 0) {
      const index = this.quantityList.findIndex(list => list.recipeId === item.recipeId);
      if (index >= 0) {
        return this.quantityList[index].quantity;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }
  generateIngredientList(): void {
    const quantity = JSON.parse(localStorage.getItem('quantity'));
    const selectedRecipe = JSON.parse(localStorage.getItem('selectedRecipe'));

    for (let i = 0; i < selectedRecipe.length; i++) {
      const index = quantity.findIndex(list => list.recipeId === selectedRecipe[i].recipeId);
      selectedRecipe[i].quantity = quantity[index].quantity;
    }


    this.isDialogOpened = true;
    this.dialog.open(MyGroceryListComponent, {
      height: '80vh',
      width: '60vw',
      panelClass: 'no-padding-container',
      data: {
        finalRecipeList: selectedRecipe,
      }
    }).afterClosed().subscribe(res => {
      this.isDialogOpened = false;
    });
  }

  quantityChanged(event, item): void {
    const index = this.quantityList.findIndex(list => list.recipeId === item.recipeId);
    this.quantityList[index].quantity = event.target.value;
    localStorage.setItem('quantity', JSON.stringify(this.quantityList));
  }

  closeMe(item): void {
    // Update Recipe Collection
    const index = this.recipeList.findIndex(recipe => recipe.recipeId === item.recipeId);
    this.recipeList.splice(index, 1);
    localStorage.setItem('selectedRecipe', JSON.stringify(this.recipeList));
    this.activeUserSingletonService.activeUserSelectedRecipe.next(this.recipeList);

    // Update Quantity Collection
    const index1 = this.quantityList.findIndex(list => list.recipeId === item.recipeId);
    this.quantityList.splice(index1, 1);
    localStorage.setItem('quantity', JSON.stringify(this.quantityList));
  }

}
