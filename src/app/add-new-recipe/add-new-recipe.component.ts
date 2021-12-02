import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {startWith} from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import {AddNewIngredientComponent} from '../home/add-new-ingredient/add-new-ingredient.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemeService} from '../shared-services/theme.service';
import {RecipeService} from '../shared-services/recipe.service';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent implements OnInit {
  theme: string;
  recipeInstruction = new FormControl();
  imageLink = new FormControl();
  defaultImage = 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png';
  imgSrc;
  imageValidFlag = false;
  isEditing = false;
  errorImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png';

  // Related to autocomplete
  filteredOptionsIngredientName: Observable<any[]>;
  public ingredientNameInputChange$: Subject<string> = new Subject<string>();

  recipeForm: FormGroup;
  ingredientNameList = new BehaviorSubject<any[]>([]);

  price = new FormControl(0.5);

  searching = false;
  recipeItem = null;

  currentUser;

  constructor(@Inject(MAT_DIALOG_DATA) data, private formBuilder: FormBuilder,
              private activeUserSingletonService: ActiveUserSingletonService,
              private recipeServiceService: RecipeServiceService,
              public dialogRef: MatDialogRef<AddNewRecipeComponent>,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private themeService: ThemeService,
              private recipeService: RecipeService) {
    this.imgSrc = this.defaultImage;
    dialogRef.disableClose = true;
    this.recipeItem = data.selectedRecipe;
    this.isEditing = data.isEditing;
    this.currentUser = data.currentUser;
  }

  ngOnInit(): void {
    this.getIngredientList();
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.prepareRow();
  }

  public prepareRow(): void {
    if (!this.isEditing) {
      this.recipeForm = this.formBuilder.group({
        recipeName: new FormControl(''),
        recipes: this.formBuilder.array([this.createFormRow()])
      });
    } else {
      this.recipeForm = this.formBuilder.group({
        recipeName: new FormControl(''),
        recipes: this.formBuilder.array([])
      });

      this.recipeForm.get('recipeName').setValue(this.recipeItem.recipeName);
      this.recipeInstruction.setValue(this.recipeItem.description);
      this.imageLink.setValue(this.recipeItem.recipePhoto);
      this.price.setValue(this.recipeItem.price);
      this.imgSrc = this.recipeItem.recipePhoto;
      this.imageValidFlag = true;
      const count = this.recipeItem.recipeItem.length;
      this.searching = false;
      for (let i = 0; i < count; i++) {
        const currentIngredient = this.getIngredientDetails(this.recipeItem.recipeItem[i].ingredients);
        if (currentIngredient) {
          (this.recipeForm.get('recipes') as FormArray).push(
            new FormGroup({
                ingredientName: new FormControl({value: this.recipeItem.recipeItem[i].ingredients, disabled: false}),
                quantity: new FormControl({value: this.recipeItem.recipeItem[i].itemQuantity, disabled: false}),
                unit: new FormControl({value: currentIngredient.unitType, disabled: false}),
                calorie: new FormControl({value: currentIngredient.calorie, disabled: false})
              }
            ));
        }
      }
    }
    this.initializeAutoComplete();
  }

  private getIngredientDetails(id: any): any {
    const index = this.ingredientNameList.value.findIndex(ing => ing._id == id);
    return this.ingredientNameList.value[index];
  }

  public createFormRow(): FormGroup {
    return new FormGroup({
      ingredientName: new FormControl({value: null, disabled: false}),
      quantity: new FormControl({value: null, disabled: false}),
      unit: new FormControl({value: null, disabled: false}),
      calorie: new FormControl({value: null, disabled: false})
    });
  }

  public addRecipeFormGroup(): void {
    (this.recipeForm.get('recipes') as FormArray).push(this.createFormRow());
  }

  public removeOrClearRecipe(i: number): void {
    const recipes = this.recipeForm.get('recipes') as FormArray;
    if (recipes.length > 1) {
      recipes.removeAt(i);
    } else {
      recipes.reset();
    }
  }

  getIsEditing(): boolean {
    return this.isEditing;
  }

  editRecipe(): void {
    const obj = {
      recipeId: this.recipeItem._id,
      recipeName: this.recipeForm.get('recipeName').value,
      description: this.recipeInstruction.value,
      price: this.price.value,
      recipePhoto: this.imageValidFlag === true ? this.imgSrc : this.defaultImage,
      isPrivate: false,
      recipeItem: [],
    };

    const recipes = this.recipeForm.get('recipes') as FormArray;

    recipes.controls.forEach(fg => {
      obj.recipeItem.push({
        ingredients: fg.value.ingredientName,
        itemQuantity: fg.value.quantity
      });
    });
    this.recipeService.updateRecipe(obj).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

  saveRecipe(): void {
    const obj = {
      user: this.currentUser._id,
      userEmail: this.currentUser.email,
      description: this.recipeInstruction.value,
      price: this.price.value,
      isGlobal: true,
      recipeName: this.recipeForm.get('recipeName').value,
      recipePhoto: this.imageValidFlag === true ? this.imgSrc : this.defaultImage,
      recipeItem: [],
    };
    const recipes = this.recipeForm.get('recipes') as FormArray;

    recipes.controls.forEach(fg => {
      obj.recipeItem.push({
        ingredients: fg.value.ingredientName,
        itemQuantity: fg.value.quantity
      });
    });
    this.recipeService.createRecipe(obj).subscribe(res => {
      this.dialogRef.close(true);
    });
  }



  initializeAutoComplete(): void {
    this.filteredOptionsIngredientName = this.ingredientNameInputChange$.pipe(
      startWith(''),
      rxjsOps.debounceTime(100),
      rxjsOps.map((s: string) => this.ingredientNameList.value.filter(specialty => specialty.ingredientName.toLowerCase()
        .includes(s.toLowerCase())))
    );
  }

  getIngredientDisplayName = (ingredientId) => {
    const index = this.ingredientNameList.value.findIndex(item => item._id === ingredientId);
    return index >= 0 && this.ingredientNameList && this.ingredientNameList.value && this.ingredientNameList.value.length > 0 ?
      this.ingredientNameList.value[this.ingredientNameList.value.findIndex(item => item._id === ingredientId)]
        .ingredientName : '';
  }

  ingredientSelected(event, i): void {
    const formArray = this.recipeForm.get('recipes') as FormArray;
    const currentFormGroup = formArray.at(i);
    (currentFormGroup as FormGroup).controls.quantity.setValue(1);
    const ingredientIndexInExistingIngredientNameList =
      this.ingredientNameList.value
        .findIndex(ingredient => ingredient._id === (currentFormGroup as FormGroup).controls.ingredientName.value);

    if (this.ingredientNameList && this.ingredientNameList.value && this.ingredientNameList.value.length > 0) {
      (currentFormGroup as FormGroup).controls.calorie
        .setValue(this.ingredientNameList.value[ingredientIndexInExistingIngredientNameList].calorie);
      (currentFormGroup as FormGroup).controls.unit
        .setValue(this.ingredientNameList
          .value[ingredientIndexInExistingIngredientNameList].unitType);
    }
  }

  quantityChanged(event, i): void {
    const formArray = this.recipeForm.get('recipes') as FormArray;
    const currentFormGroup = formArray.at(i);
    const ingredientIndexInExistingIngredientNameList =
      this.ingredientNameList.value
        .findIndex(ingredient => ingredient._id === (currentFormGroup as FormGroup).controls.ingredientName.value);

    (currentFormGroup as FormGroup).patchValue({
      calorie: this.ingredientNameList.value[ingredientIndexInExistingIngredientNameList].calorie * event.target.value
    });
  }

  updateImageSource(event): void {
    this.imgSrc = event.target.value;
    this.imageValidFlag = true;
  }

  brokenLink(): void {
    this.imgSrc = this.errorImage;
    this.imageValidFlag = false;
  }

  increasePrice(): void {
    this.price.setValue(Number(this.price.value) + 0.5);
  }

  decreasePrice(): void {
    if (this.price.value <= 0) {
      this.price.setValue(0);
    } else {
      this.price.setValue(Number(this.price.value) - 0.5);
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  openAddNewIngredientDialog(): void {
    const dialogRef = this.dialog.open(AddNewIngredientComponent,
      {
        height: '100px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          currentUser: this.currentUser
        }
      }
    ).afterClosed().subscribe(res => {
      if (res === 'done') {
        this.getIngredientList();
        this.openSnackBar('Ingredient Added!', '');
      } else if (res === 'fail') {
        console.log('failed');
        this.openSnackBar('Failed', '');
      } else if (res === 'cancel') {
        console.log('you cancelled');
        this.openSnackBar('Cancelled', '');
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getIngredientList(): void {
    this.searching = true;
    if (this.currentUser && this.currentUser.email) {
      this.recipeService.getAllIngredients(this.currentUser.email).subscribe(res => {
        this.ingredientNameList.next(res.ingredients[0]);
        this.searching = false;
        this.prepareRow();
      }, error => {
        this.searching = false;
      });
    }
  }

}
