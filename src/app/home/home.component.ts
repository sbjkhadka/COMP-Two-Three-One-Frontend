import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {BehaviorSubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';
import {AddNewRecipeComponent} from '../add-new-recipe/add-new-recipe.component';
import {ConfirmationDialogComponent} from './generic-dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {RecipeService} from '../shared-services/recipe.service';
import {ThemeService} from '../shared-services/theme.service';
import {SessionStorageService} from '../shared-services/session-storage.service';
import {LocalStorageService} from '../shared-services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  theme: string;
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    private recipeService: RecipeService,
    private sessionStorageService: SessionStorageService,
    private cdRef: ChangeDetectorRef,
    private localStorageService: LocalStorageService) {}

  @ViewChild('registerAuthComponent') registerAuthComponent: RegisterAuthComponent;
  displayingStockRecipes = true;
  myRecipe = new BehaviorSubject<any[]>([]);
  stockRecipe = [];
  users = new BehaviorSubject<any[]>([]);
  currentUser;
  recipeInDisplay: any[] = [];
  myRecipees: any[] = [];
  notMyRecipees: any[] = [];
  showingMyRecipeOnly = false;
  fallbackRecipeImage = 'https://aadhyafoodindian.com/img/placeholders/grey_fork_and_knife.png';


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
      if (loggedInUser) {
        this.currentUser = JSON.parse(loggedInUser).user;
      }
    }
  }

  recipeItemClicked(item: any): void {
    this.dialog.open(RecipeDetailsComponent,
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
    this.dialog.open(AddNewRecipeComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: item,
          isEditing: true,
          currentUser: this.currentUser
        }
      }
    ).afterClosed().subscribe(res => {
      if (res) {
        this.openSnackBar('Recipe updated!', '');
        this.getAllRecipes1();
      }
    });
  }

  openAddNewRecipeDialog(): void {
    this.dialog.open(AddNewRecipeComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: null,
          isEditing: false,
          currentUser: this.currentUser
        }
      }
    ).afterClosed().subscribe(res => {
      if (res) {
        this.openSnackBar('Recipe added!', '');
        this.getAllRecipes1();
      }
    });
  }

  deleteRecipe(item): void {
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
        this.recipeService.deleteRecipe(item._id).subscribe(response => {
          if (response.status === 200) {
            const index = this.recipeInDisplay.findIndex(r => r._id === item._id);
            if (index >= 0) {
              this.recipeInDisplay.splice(index, 1);
            }
            this.openSnackBar('Deleted successfully', '');
          } else {
            this.openSnackBar('Deleted failed', '');
          }
        }, error => {
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
    const currentSelected = JSON.parse(this.localStorageService.getItem('selectedRecipe')) || [];
    const quantity = JSON.parse(this.localStorageService.getItem('quantity')) || [];
    if (event.checked) {
      currentSelected.push(item);
      quantity.push({
        recipeId: item._id,
        quantity: 1
      });
    } else {
      const index = currentSelected.findIndex(recipe => recipe._id === item._id);
      const indexQuantity = quantity.findIndex(qty => qty.recipeId === item._id);
      currentSelected.splice(index, 1);
      quantity.splice(indexQuantity, 1);
    }
    this.localStorageService.setItem('selectedRecipe', JSON.stringify(currentSelected));
    this.localStorageService.setItem('quantity', JSON.stringify(quantity));
  }

  shouldICheck(item): boolean {
    if (JSON.parse(localStorage.getItem('selectedRecipe'))) {
      const index = JSON.parse(localStorage.getItem('selectedRecipe')).findIndex(recipe => recipe._id === item._id);
      return index >= 0;
    } else {
      return false;
    }
  }

  getAllRecipes1(): void {
    this.recipeInDisplay = [];
    this.myRecipees = [];
    this.notMyRecipees = [];
    this.recipeService.getAllRecipes().subscribe(value => {
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

