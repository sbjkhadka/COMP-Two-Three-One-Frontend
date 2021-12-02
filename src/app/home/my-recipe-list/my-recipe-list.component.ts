import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MyGroceryListComponent} from './my-grocery-list/my-grocery-list.component';
import {ThemeService} from '../../shared-services/theme.service';

@Component({
  selector: 'app-my-recipe-list',
  templateUrl: './my-recipe-list.component.html',
  styleUrls: ['./my-recipe-list.component.css']
})
export class MyRecipeListComponent implements OnInit {
  theme: string;
  fallbackRecipeImage = 'https://aadhyafoodindian.com/img/placeholders/grey_fork_and_knife.png';
  constructor(
    public dialog: MatDialog,
    private themeService: ThemeService) {
    this.confirmUserLoginAfterPageReload();
    this.recipeList = JSON.parse(localStorage.getItem('selectedRecipe'));
    this.quantityList = JSON.parse(localStorage.getItem('quantity'));
    if (this.recipeList && this.recipeList.length > 0) {
      this.initializeQuantity();
    }
  }

  loggedInUser;
  recipeList;
  quantityList;
  isDialogOpened = false;

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

  initializeQuantity(): void {
    if (!this.quantityList) {
      for (let i = 0; i < this.recipeList.length; i++) {
        this.quantityList = [];
        this.quantityList.push({
          recipeId: this.recipeList[i]._id,
          quantity: 1
        });
      }
      localStorage.setItem('quantity', JSON.stringify(this.quantityList));
    }
  }

  confirmUserLoginAfterPageReload(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedInUser) {
    }
  }

  pleaseGiveMeQuantity(item): number {
    if (this.quantityList && this.quantityList.length > 0) {
      const index = this.quantityList.findIndex(list => list.recipeId === item._id);
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

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < selectedRecipe.length; i++) {
      const index = quantity.findIndex(list => list.recipeId === selectedRecipe[i]._id);
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
    const index = this.quantityList.findIndex(list => list.recipeId === item._id);
    if (index >= 0) {
        this.quantityList[index].quantity = Number(event.target.value);
      } else {
        this.quantityList.push({
          recipeId: item._id,
          quantity: event.target.value
        });
      }
    localStorage.setItem('quantity', JSON.stringify(this.quantityList));
  }

  closeMe(item): void {
    // Update Recipe Collection
    const index = this.recipeList.findIndex(recipe => recipe._id === item._id);
    this.recipeList.splice(index, 1);
    localStorage.setItem('selectedRecipe', JSON.stringify(this.recipeList));

    // Update Quantity Collection
    const index1 = this.quantityList.findIndex(list => list.recipeId === item._id);
    this.quantityList.splice(index1, 1);
    localStorage.setItem('quantity', JSON.stringify(this.quantityList));
  }
}
