import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
import {RecipeService} from '../shared-services/recipe.service';
import {ThemeService} from '../shared-services/theme.service';
import {SessionStorageService} from '../shared-services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  theme: string;
  constructor(
    public firebaseService: FirebaseService,
    public recipeServiceService: RecipeServiceService,
    public activeUserSingletonService: ActiveUserSingletonService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    private recipeService: RecipeService,
    private sessionStorageService: SessionStorageService,
    private cdRef: ChangeDetectorRef) {
    // this.confirmUserLoginAfterPageReload();
    // this.getListOfUsers();

  }
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
  recipeInDisplay: any[] = []; // Create a model later
  myRecipees: any[] = [];
  notMyRecipees: any[] = [];
  showingMyRecipeOnly = false;
  fallbackRecipeImage = 'https://explorelompoc.com/wp-content/uploads/2021/06/food_placeholder.jpg';

  // will use it later
  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });

    this.updateCurrentUser();
    this.getAllRecipes1();
  }

  updateCurrentUser(): void {
    if (this.sessionStorageService.isLoggedIn()) {
      const loggedInUser = this.sessionStorageService.getItem('logged_in_user');
      console.log(loggedInUser);
      if (loggedInUser) {
        this.currentUser = JSON.parse(loggedInUser).user;
        console.log(this.currentUser);
      }
    }
  }


  recipeItemClicked(item: any): void {
    // console.log('item.recipe_name' + item.recipe_name);
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
    // console.log('item.recipe_name:' + item.recipeName);
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
      // this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
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
      // this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
      // this.addStockRecipe();
    });

  }


  // tslint:disable-next-line:typedef
  updateToggleButton(): void {
    this.loggedInUserRecipes.subscribe(val => {
      // console.log('val', val);
      if (val && val.length > 0) {
        if (val[0].roleName.toLowerCase() === 'chef') {
          this.stockRecipeToggleButtonStatus = true;
          // console.log('chef');
        } else {
          // console.log('not chef');
        }
      }

    });
  }




  deleteRecipe(item): void {
    // console.log('deleting', item);
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
        // console.log('deleting', item);
        this.recipeServiceService.deleteRecipe(item.recipeId, item.partyId).subscribe(res => {
          // console.log('deleted_successfully', res);
          this.openSnackBar('Deleted successfully', '');
          // this.getAllRecipes(this.activeUserSingletonService.activeUser.getValue());
        }, error => {
          // console.log('delete_failed', error);
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
    // console.log('isChecked', event.checked);
    // console.log('item', item);
    const currentSelected = this.activeUserSingletonService.activeUserSelectedRecipe.value;
    // console.log('current_list', currentSelected);
    if (event.checked) {
      currentSelected.push(item);
    } else {
      const index = currentSelected.findIndex(recipe => recipe.recipeId === item.recipeId);
      currentSelected.splice(index, 1);
    }
    this.activeUserSingletonService.activeUserSelectedRecipe.next(currentSelected);
    localStorage.setItem('selectedRecipe', JSON.stringify(currentSelected));
    this.selectedRecipes = currentSelected;
    // console.log('now_list', currentSelected);
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




  getAllRecipes1(): void {
    this.recipeService.getAllRecipes().subscribe(value => {
      console.log('resipees', value);
      if (value.status === 200) {
        for (let i = 0; i < value.recipes.length; i++) {
          if (value.recipes[i].userEmail === this.currentUser.email) {
            this.myRecipees.push(value.recipes[i]);
          } else {
            this.notMyRecipees.push(value.recipes[i]);
          }
        }
        this.recipeInDisplay.push(...this.myRecipees);
        this.recipeInDisplay.push(...this.notMyRecipees);

      }
    });
  }


  stockDisplayToggled(event): void {
    console.log(event);
    this.recipeInDisplay = [];
    if (this.showingMyRecipeOnly) {
      this.recipeInDisplay.push(...this.myRecipees);
      this.recipeInDisplay.push(...this.notMyRecipees);
    } else {
      this.recipeInDisplay.push(...this.myRecipees);
    }
    this.showingMyRecipeOnly = !this.showingMyRecipeOnly;
    this.cdRef.detectChanges();
  }



}

