import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {BehaviorSubject} from 'rxjs';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';
import {AddNewRecipeComponent} from '../add-new-recipe/add-new-recipe.component';
import {ConfirmationDialogComponent} from './generic-dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService,
    public recipeServiceService: RecipeServiceService,
    public activeUserSingletonService: ActiveUserSingletonService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.confirmUserLoginAfterPageReload();
  }
  bannerImage = 'https://www.meriton.com.au/wp-content/uploads/Fresh_Vegetables_Portrait_Large-e1503040370565.jpg';
  loggedInUser;
  registrationErrorMessage: string;
  @ViewChild('registerAuthComponent') registerAuthComponent: RegisterAuthComponent;
  loggedInUserRecipes = new BehaviorSubject<any[]>(null);
  displayingStockRecipes = true;
  selectedRecipes;
  stockRecipeToggleButtonStatus = false;

  myRecipe: any[];

  stockRecipe: any[];

  // will use it later
  ngOnInit(): void {
    this.updateToggleButton();
  }

  confirmUserLoginAfterPageReload(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedInUser) {
      this.activeUserSingletonService.activeUser.next(this.loggedInUser.uid);
      this.activeUserSingletonService.activeUserDetails.next(this.loggedInUser);
      this.getAllRecipes(this.loggedInUser.uid);
    }
  }

  login(event): void{
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.activeUserSingletonService.activeUser.next(this.loggedInUser.uid); // feeding singleton

    console.log('logged_in_user', this.loggedInUser);
    this.activeUserSingletonService.activeUserDetails.next(this.loggedInUser);
    this.getAllRecipes(this.loggedInUser.uid);
  }

  register(event): void {
    if (event === false) {
      this.registrationErrorMessage = 'Registration failed';
    } else {
      this.registrationErrorMessage = 'Successfully registered';
    }
  }

  logout(): any {
    localStorage.removeItem('user');
    this.loggedInUser = undefined;

    this.firebaseService.logOut();
  }

  recipeItemClicked(item: any): void {
    console.log('item.recipe_name' + item.recipe_name);
    const dialogRef = this.dialog.open(RecipeDetailsComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: item
        }
      }
    );
  }

  editRecipe(item: any): void {
    console.log('item.recipe_name:' + item.recipeName);
    const dialogRef = this.dialog.open(AddNewRecipeComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: item,
          isEditing: true
        }
      }
    ).afterClosed().subscribe(res => {
      // this.getAllRecipes(this.activeUserSingletonService.activeUser);
      this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
      // this.addStockRecipe();
    });
  }


  openAddNewRecipeDialog(): void {
    const dialogRef = this.dialog.open(AddNewRecipeComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: null,
          isEditing: false
        }
      }
    ).afterClosed().subscribe(res => {
      // this.getAllRecipes(this.activeUserSingletonService.activeUser);
      this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
      // this.addStockRecipe();
    });

  }
  getAllRecipes(loggedInUserId: string): void {
    this.recipeServiceService.getRecipeByPartyId(loggedInUserId).subscribe(res => {
      console.log('response _ my', res);
      this.myRecipe = res.payload;
      // this.activeUserSingletonService.activeUserRecipe.next(res.payload); // feeding singleton
      // this.loggedInUserRecipes.next( res.payload);
      console.log('logged_in_user_recipes_inside', this.loggedInUserRecipes);
      this.loggedInUserRecipes.next(res.payload);

      this.updateToggleButton();
      this.checkLocalStorage();
    });

    this.addStockRecipe();

  }

  // tslint:disable-next-line:typedef
  updateToggleButton(): void {
    this.loggedInUserRecipes.subscribe(val => {
      console.log('val', val);
      if (val && val.length > 0) {
        if (val[0].roleName.toLowerCase() === 'chef') {
          this.stockRecipeToggleButtonStatus = true;
          console.log('chef');
        } else {
          console.log('not chef');
        }
      }

    });
  }
  addStockRecipe(): void {
    this.recipeServiceService.getAllStockRecipe().subscribe(res => {
      console.log('stock_recipes____________-', res.payload);
      this.stockRecipe = res.payload;
      if (this.displayingStockRecipes === true) {
        console.log('showing/hiding');
        this.showHideStockRecipe(true);
      }

    });
  }

  stockDisplayToggled(event): void {
    console.log('event', event.checked);
    this.showHideStockRecipe(event.checked);
  }

  showHideStockRecipe(show: boolean): void {
    const myRec = this.myRecipe.slice();
    const stockRec = this.stockRecipe.slice();
    console.log('my', myRec);
    console.log('stock', stockRec);
    if (show === true) {
      const finalRec =  [];
      myRec.map(rec => {
        finalRec.push(rec);
      });
      stockRec.map(rec => {
        finalRec.push(rec);
      });
      console.log('true');
      this.activeUserSingletonService.activeUserRecipe.next(finalRec); // feeding singleton
      this.loggedInUserRecipes.next( finalRec);
      console.log('true', finalRec);
      this.displayingStockRecipes = true;
    } else {
      console.log('false');
      this.activeUserSingletonService.activeUserRecipe.next(myRec); // feeding singleton
      this.loggedInUserRecipes.next(myRec);
      this.displayingStockRecipes = false;
    }
  }

  deleteRecipe(item): void {
    console.log('deleting', item);
    const deleteRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '200px',
      width: '500px',
      panelClass: 'no-padding-container',
      data: {
        itemName: item.recipeName,
        itemType: 'recipe'
      }
    });
    deleteRef.afterClosed().subscribe(decision => {
      if (decision) {
        console.log('deleting', item);
        this.recipeServiceService.deleteRecipe(item.recipeId, item.partyId).subscribe(res => {
          console.log('deleted_successfully', res);
          this.openSnackBar('Deleted successfully', '');
          this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
        }, error => {
          console.log('delete_failed', error);
          this.openSnackBar('Deleted failed', '');
        });
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  recipeAdded(event, item): void {
    console.log('isChecked', event.checked);
    console.log('item', item);
    const currentSelected = this.activeUserSingletonService.activeUserSelectedRecipe.value;
    console.log('current_list', currentSelected);
    if (event.checked) {
      currentSelected.push(item);
    } else {
      const index = currentSelected.findIndex(recipe => recipe.recipeId === item.recipeId);
      currentSelected.splice(index, 1);
    }
    this.activeUserSingletonService.activeUserSelectedRecipe.next(currentSelected);
    localStorage.setItem('selectedRecipe', JSON.stringify(currentSelected));
    this.selectedRecipes = currentSelected;
    console.log('now_list', currentSelected);
  }

  checkLocalStorage(): void {
    if (localStorage.getItem('selectedRecipe')) {
      this.selectedRecipes = JSON.parse(localStorage.getItem('selectedRecipe'));
      this.activeUserSingletonService.activeUserSelectedRecipe.next(this.selectedRecipes);
    }
  }

  shouldICheck(item): boolean {
    if (JSON.parse(localStorage.getItem('selectedRecipe'))) {
      const index = JSON.parse(localStorage.getItem('selectedRecipe')).findIndex(recipe => recipe.recipeId === item.recipeId);
      return index >= 0;
    } else {
      return false;
    }
  }



}

