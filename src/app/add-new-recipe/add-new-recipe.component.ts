import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})
export class AddNewRecipeComponent implements OnInit {

  recipeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private activeUserSingletonService: ActiveUserSingletonService,
              private recipeServiceService: RecipeServiceService,
              public dialogRef: MatDialogRef<AddNewRecipeComponent>) { }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      recipeName: new FormControl(''),
      recipes: this.formBuilder.array([this.createFormRow()])
    });
  }


  public createFormRow(): FormGroup {
    return new FormGroup({
      ingredientName: new FormControl(''),
      quantity: new FormControl(''),
      unit: new FormControl(''),
      calorie: new FormControl({value: '100', disabled: true})
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
      partyId: this.activeUserSingletonService.activeUser,
      price: '10',
      recipeItemList: [],
      recipeName: this.recipeForm.get('recipeName').value,
      recipePhoto: 'https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2017/07/11/d5c29724-5fd6-11e7-badc-596de3df2027_1280x720_052509.JPG?itok=1yxP-qQu'
    };

    const recipes = this.recipeForm.get('recipes') as FormArray;
    recipes.controls.forEach(fg => {
      console.log('fg', fg);
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



}
