import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {startWith} from 'rxjs/operators';
import * as rxjsOps from 'rxjs/operators';
import {MatAutocomplete} from '@angular/material/autocomplete';

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
  errorImage = 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png';

  // Related to autocomplete
  filteredOptionsIngredientName: Observable<any[]>;
  public ingredientNameInputChange$: Subject<string> = new Subject<string>();

  recipeForm: FormGroup;
  ingredientNameList = new BehaviorSubject<any[]>([]);

  price = new FormControl(0.5);

  constructor(private formBuilder: FormBuilder,
              private activeUserSingletonService: ActiveUserSingletonService,
              private recipeServiceService: RecipeServiceService,
              public dialogRef: MatDialogRef<AddNewRecipeComponent>) {
    this.imgSrc = this.defaultImage;
    this.getIngredientList();
  }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      recipeName: new FormControl(''),
      recipes: this.formBuilder.array([this.createFormRow()])
    });
    console.log('ing_list', this.ingredientNameList);
    this.initializeAutoCompleteForSpecialty();
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

  saveRecipe(): void {
    console.log('instructions', this.recipeInstruction.value);
    console.log('image_link', this.imageLink.value);

    const obj  = {
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

    }

  getIngredientList(): void {
    this.recipeServiceService.getAllIngredients().subscribe(res => {
      this.ingredientNameList.next(res.payload);
    });
  }

  initializeAutoCompleteForSpecialty(): void {
    this.filteredOptionsIngredientName = this.ingredientNameInputChange$.pipe(
      startWith(''),
      rxjsOps.debounceTime(100),
      rxjsOps.map((s: string) => this.ingredientNameList.value.filter(specialty => specialty.ingredientName.toLowerCase()
        .includes(s.toLowerCase())))
    );
  }

  getIngredientDisplayName = (ingredientId) => {
    console.log(this.ingredientNameList.value.findIndex(item => item.ingredientId === ingredientId));
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
      (currentFormGroup as FormGroup).controls.unit
        .setValue(this.ingredientNameList
          .value[ingredientIndexInExistingIngredientNameList].calorie); // change to .unitType after Ayhan does his correction


    }
    // uncomment/delete below after Ayhan makes his correction
    // (currentFormGroup as FormGroup).controls.calorie
    //   .setValue(this.ingredientNameList.value[ingredientIndexInExistingIngredientNameList].calorie);
    (currentFormGroup as FormGroup).controls.calorie
      .setValue(10);

  }



  quantityChanged(event, i): void {
    const formArray = this.recipeForm.get('recipes') as FormArray;
    console.log('index', i);
    console.log('value',  Number(event.target.value));
    const currentFormGroup = formArray.at(i);



    const ingredientIndexInExistingIngredientNameList =
      this.ingredientNameList.value
        .findIndex(ingredient => ingredient.ingredientId === (currentFormGroup as FormGroup).controls.ingredientName.value);

    (currentFormGroup as FormGroup).patchValue({
      // uncomment/ delete after Ayhan's update
      // calorie: this.ingredientNameList.value[ingredientIndexInExistingIngredientNameList].calorie * event.target.value
      calorie: 10 * event.target.value
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
    this.price.setValue(Number(this.price.value) - 0.5);
  }



}
