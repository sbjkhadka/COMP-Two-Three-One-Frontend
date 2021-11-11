import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {BehaviorSubject, forkJoin} from 'rxjs';
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
    this.getListOfUsers();
  }
  bannerImage = 'https://www.meriton.com.au/wp-content/uploads/Fresh_Vegetables_Portrait_Large-e1503040370565.jpg';
  loggedInUser;
  registrationErrorMessage: string;
  @ViewChild('registerAuthComponent') registerAuthComponent: RegisterAuthComponent;
  loggedInUserRecipes = new BehaviorSubject<any[]>(null);
  displayingStockRecipes = true;
  selectedRecipes;
  stockRecipeToggleButtonStatus = false;

  myRecipe = new BehaviorSubject<any[]>([]);

  stockRecipe = [];
  users = new BehaviorSubject<any[]>([]);
  currentUser;

  // will use it later
  ngOnInit(): void {
    this.login();
    this.updateToggleButton();
  }
  getListOfUsers(): void {
    this.recipeServiceService.getAllRoles().subscribe(res => {
      console.log('users', res.payload);
      this.users.next(res.payload);
    });
  }

  confirmUserLoginAfterPageReload(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedInUser) {
      this.activeUserSingletonService.activeUser.next(this.loggedInUser.uid);
      this.activeUserSingletonService.activeUserDetails.next(this.loggedInUser);
      this.getAllRecipes(this.loggedInUser.uid);
    }
  }
  checkTrainer(): void {
    this.users.subscribe(res => {
      console.log('LIST OF USERS', res);
      console.log('LOGGED_IN_USERS', this.loggedInUser);
      const user = res.find(element => element.partyId === this.loggedInUser.uid);
      if (user) {
        console.log('USERRRRRRRRR', user);
        // this.currentUser.next(user);
        this.activeUserSingletonService.activeUserDetailsFromDB.next(user);
      }
      console.log('USER', user);
    });
    this.activeUserSingletonService.activeUserDetailsFromDB.subscribe(value => {
      this.currentUser = value;
    });
  }

  login(): void{
    this.loggedInUser = JSON.parse(localStorage.getItem('logged_in_user'));
    this.getAllRecipes(this.loggedInUser.user.email);
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
    this.recipeServiceService.getAllStockRecipe().subscribe(res => {
      console.log('response _ my', res);
      this.myRecipe.next(res.payload);
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
      this.stockRecipe = res.payload;
      if (this.displayingStockRecipes === true) {
        this.getMyRecipeAndStockRecipe(true);
      } else {
        this.getMyRecipeAndStockRecipe(false);
      }
    });
  }

  stockDisplayToggled(event): void {
    this.getMyRecipeAndStockRecipe(event.checked);
  }

  getMyRecipeAndStockRecipe(event?): void {
    setTimeout(() => {
      let myRec;
      let stockRec;
      this.myRecipe.subscribe(val => {
        console.log('VALUE', val);
        myRec = val;
        stockRec = this.stockRecipe;
        this.showHideStockRecipe(event, myRec, stockRec);
      });
    }, 1000);

  }

  showHideStockRecipe(show: boolean, myRec?, stockRec?): void {
    if (show === true) {
      const finalRec =  [];
      myRec.map(rec => {
        finalRec.push(rec);
      });
      stockRec.map(rec => {
        finalRec.push(rec);
      });
      this.activeUserSingletonService.activeUserRecipe.next(finalRec); // feeding singleton
      this.loggedInUserRecipes.next( finalRec);
      this.displayingStockRecipes = true;
    } else {
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

  getLoggedInDetail(event): void {
    console.log('EVENT', event);
  }



}

