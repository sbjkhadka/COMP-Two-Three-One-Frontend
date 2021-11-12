import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {startWith} from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {AddNewIngredientComponent} from '../home/add-new-ingredient/add-new-ingredient.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent implements OnInit {

  // Related to recipe image
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

  price = new FormControl(0.50);

  searching = false;
  recipeItem = null;

  constructor(@Inject(MAT_DIALOG_DATA) data, private formBuilder: FormBuilder,
              private activeUserSingletonService: ActiveUserSingletonService,
              private recipeServiceService: RecipeServiceService,
              public dialogRef: MatDialogRef<AddNewRecipeComponent>,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this.imgSrc = this.defaultImage;
    this.getIngredientList();
    dialogRef.disableClose = true;
    this.recipeItem = data.selectedRecipe;
    this.isEditing = data.isEditing;
    console.log('selected', this.recipeItem);
  }

  ngOnInit(): void {
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
        recipes: this.formBuilder.array([this.createFormRowForEdit()])
      });

      this.recipeForm.get('recipeName').setValue(this.recipeItem.recipeName);
      this.recipeInstruction.setValue(this.recipeItem.description);
      this.imageLink.setValue(this.recipeItem.recipePhoto);
      this.price.setValue(this.recipeItem.price);
      this.imgSrc = this.recipeItem.recipePhoto;
      this.imageValidFlag = true;
      const count = this.recipeItem.recipeItemList.length;

      for (let i = 1; i < count; i++) {

        (this.recipeForm.get('recipes') as FormArray).push(
          new FormGroup({
              ingredientName: new FormControl({value: this.recipeItem.recipeItemList[i].ingredientId, disabled: false}),
              quantity: new FormControl({value: this.recipeItem.recipeItemList[i].itemQuantity, disabled: false}),
              unit: new FormControl({value: this.recipeItem.recipeItemList[i].unitType, disabled: false}),
              calorie: new FormControl({value: this.recipeItem.recipeItemList[i].calorie, disabled: false})
            }
          ));
      }
    }

    console.log('ing_list', this.ingredientNameList);
    this.initializeAutoComplete();
  }

  public createFormRowForEdit(): FormGroup {
    console.log('item: ' + this.recipeItem.recipeItemList[0].ingredientId);
    return new FormGroup({
      ingredientName: new FormControl({value: this.recipeItem.recipeItemList[0].ingredientId, disabled: false}),
      quantity: new FormControl({value: this.recipeItem.recipeItemList[0].itemQuantity, disabled: false}),
      unit: new FormControl({value: this.recipeItem.recipeItemList[0].unitType, disabled: false}),
      calorie: new FormControl({value: this.recipeItem.recipeItemList[0].calorie, disabled: false})
    });
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
    console.log('instructions1', this.recipeInstruction.value);
    console.log('image_link1', this.imageLink.value);
    const obj = {
      description: this.recipeInstruction.value,
      partyId: this.activeUserSingletonService.activeUser.getValue(),
      price: this.price.value,
      recipeItemList: [],
      recipeName: this.recipeForm.get('recipeName').value,
      recipePhoto: this.imageValidFlag === true ? this.imgSrc : this.defaultImage
    };

    const recipes = this.recipeForm.get('recipes') as FormArray;

    recipes.controls.forEach(fg => {
      console.log('fg', fg.value.ingredientName);
      obj.recipeItemList.push({
        ingredientId: fg.value.ingredientName,
        itemQuantity: fg.value.quantity
      });
    });
    console.log('in side is editing:' + this.recipeItem.recipeId);
    console.log('obj:' + obj.recipeName);
    this.recipeServiceService.updateRecipe(this.recipeItem.recipeId, obj).subscribe(res => {
      console.log('update_recipe_response', res);
      this.dialogRef.close();
    });
  }

  saveRecipe(): void {
    console.log('instructions', this.recipeInstruction.value);
    console.log('image_link', this.imageLink.value);

    const obj = {
      description: this.recipeInstruction.value,
      partyId: this.activeUserSingletonService.activeUser.getValue(),
      price: this.price.value,
      recipeItemList: [],
      recipeName: this.recipeForm.get('recipeName').value,
      recipePhoto: this.imageValidFlag === true ? this.imgSrc : this.defaultImage
    };
    const recipes = this.recipeForm.get('recipes') as FormArray;

    recipes.controls.forEach(fg => {
      console.log('fg', fg.value);
      obj.recipeItemList.push({
        ingredientId: fg.value.ingredientName,
        itemQuantity: fg.value.quantity
      });
    });
    console.log('final obj', obj);
    this.recipeServiceService.createRecipe(obj).subscribe(res => {
      console.log('create_recipe_response', res);
      this.dialogRef.close();
    });
    // if (this.isEditing) {
    //   console.log('in side is editing:' + this.recipeItem.recipeId);
    //   console.log('obj:' + obj.recipeName);
    //   this.recipeServiceService.updateRecipe(this.recipeItem.recipeId, obj).subscribe(res => {
    //     console.log('update_recipe_response', res);
    //     this.dialogRef.close();
    //   });
    // } else {
    //   console.log('final obj', obj);
    //   this.recipeServiceService.createRecipe(obj).subscribe(res => {
    //     console.log('create_recipe_response', res);
    //     this.dialogRef.close();
    //   });
  }

  getIngredientList(): void {
    this.searching = true;
    this.recipeServiceService.getAllIngredients().subscribe(res => {
      console.log('ingredient_name_list_loaded', res.payload);
      this.ingredientNameList.next(res.payload);
      this.searching = false;
      this.initializeAutoComplete();
      this.prepareRow();
    }, error => {
      this.searching = false;
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
    console.log('displaying' + ingredientId, this.ingredientNameList.value.findIndex(item => item.ingredientId === ingredientId));
    console.log('Ing_name_list', this.ingredientNameList.value);
    const index = this.ingredientNameList.value.findIndex(item => item.ingredientId === ingredientId);
    return index >= 0 && this.ingredientNameList && this.ingredientNameList.value && this.ingredientNameList.value.length > 0 ?
      this.ingredientNameList.value[this.ingredientNameList.value.findIndex(item => item.ingredientId === ingredientId)]
        .ingredientName : '';
  }


  ingredientSelected(event, i): void {
    const formArray = this.recipeForm.get('recipes') as FormArray;
    const currentFormGroup = formArray.at(i);
    (currentFormGroup as FormGroup).controls.quantity.setValue(1);
    const ingredientIndexInExistingIngredientNameList =
      this.ingredientNameList.value
        .findIndex(ingredient => ingredient.ingredientId === (currentFormGroup as FormGroup).controls.ingredientName.value);

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
        .findIndex(ingredient => ingredient.ingredientId === (currentFormGroup as FormGroup).controls.ingredientName.value);

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
    this.price.setValue(Number(this.price.value) + 0.50);
  }

  decreasePrice(): void {
    if (this.price.value <= 0) {
      this.price.setValue(0);
    } else {
      this.price.setValue(Number(this.price.value) - 0.50);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  openAddNewIngredientDialog(): void {
    const dialogRef = this.dialog.open(AddNewIngredientComponent,
      {
        height: '100px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: 'Hello world'
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
      console.log('Add Status', res);
    });

  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
