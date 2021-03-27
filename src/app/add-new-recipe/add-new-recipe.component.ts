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

  recipeInstruction = new FormControl();
  imageLink = new FormControl();
  imgSrc = 'https://cdn0.iconfinder.com/data/icons/kameleon-free-pack-rounded/110/Food-Dome-512.png';
  // Related to autocomplete
  filteredOptionsIngredientName: Observable<any[]>;
  public ingredientNameInputChange$: Subject<string> = new Subject<string>();

  recipeForm: FormGroup;
  ingredientNameList = new BehaviorSubject<any[]>([]);

  constructor(private formBuilder: FormBuilder,
              private activeUserSingletonService: ActiveUserSingletonService,
              private recipeServiceService: RecipeServiceService,
              public dialogRef: MatDialogRef<AddNewRecipeComponent>) {
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
      ingredientName: new FormControl(''),
      quantity: new FormControl({value: null, disabled: true}),
      unit: new FormControl({value: null, disabled: true}),
      calorie: new FormControl({value: null, disabled: true})
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

    const obj  = {
      description: 'lorem ipsum',
      partyId: this.activeUserSingletonService.activeUser.getValue(),
      price: '10',
      recipeItemList: [],
      recipeName: this.recipeForm.get('recipeName').value,
      recipePhoto: 'https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2017/07/11/d5c29724-5fd6-11e7-badc-596de3df2027_1280x720_052509.JPG?itok=1yxP-qQu'
    };

    const recipes = this.recipeForm.get('recipes') as FormArray;
    recipes.controls.forEach(fg => {
      obj.recipeItemList.push({
        ingredientId: 2,
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
    (currentFormGroup as FormGroup).controls.ingredientName.disable();
    (currentFormGroup as FormGroup).controls.calorie.disable();
    (currentFormGroup as FormGroup).controls.quantity.enable();
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
    // const existingCalorie =


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
  }


}
