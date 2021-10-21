import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RecipeServiceService} from '../../shared-services/recipe-service.service';
import {ActiveUserSingletonService} from '../../shared-services/active-user-singleton.service';

@Component({
  selector: 'app-add-new-ingredient',
  templateUrl: './add-new-ingredient.component.html',
  styleUrls: ['./add-new-ingredient.component.css']
})
export class AddNewIngredientComponent implements OnInit {

  ingredientForm: FormGroup;
  submitted = false;
  partyId;

  constructor(public dialogRef: MatDialogRef<AddNewIngredientComponent>,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private recipeServiceService: RecipeServiceService,
              private activeUserSingletonService: ActiveUserSingletonService) {
    dialogRef.disableClose = true;
    this.ingredientForm = this.formBuilder.group({
      ingredientName: new FormControl('', Validators.required),
      calorie: new FormControl(100),
      unit: new FormControl(Validators.required)
    });
    this.partyId = this.activeUserSingletonService.activeUser.getValue();
  }

  ngOnInit(): void {
  }



  close(): void {
    this.dialogRef.close('cancel');
  }
  createIngredient(): void {
    this.submitted = true;
    if (this.ingredientForm.invalid) {
      return;
    }

    const obj = {
      calorie: this.ingredientForm.controls.calorie.value,
      ingredientName: this.ingredientForm.controls.ingredientName.value,
      partyId: this.partyId,
      unitType: this.ingredientForm.controls.unit.value
    };

    console.log('prep_oj', obj);


    this.recipeServiceService.createIngredient(obj).subscribe(res => {
      console.log('created_ingredient', res);
      this.dialogRef.close('done');
    }, error => {
      console.log('error', error);
      this.dialogRef.close('fail');
    });
    console.log('sent');
  }

}
