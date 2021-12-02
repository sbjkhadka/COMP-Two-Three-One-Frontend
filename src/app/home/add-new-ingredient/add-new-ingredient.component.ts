import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActiveUserSingletonService} from '../../shared-services/active-user-singleton.service';
import {ThemeService} from '../../shared-services/theme.service';
import {RecipeService} from '../../shared-services/recipe.service';

@Component({
  selector: 'app-add-new-ingredient',
  templateUrl: './add-new-ingredient.component.html',
  styleUrls: ['./add-new-ingredient.component.css']
})
export class AddNewIngredientComponent implements OnInit {

  theme: string;
  ingredientForm: FormGroup;
  submitted = false;
  currentUser;

  constructor(public dialogRef: MatDialogRef<AddNewIngredientComponent>,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private activeUserSingletonService: ActiveUserSingletonService,
              private themeService: ThemeService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.currentUser = data.currentUser;
    dialogRef.disableClose = true;
    this.ingredientForm = this.formBuilder.group({
      ingredientName: new FormControl('', Validators.required),
      calorie: new FormControl(100),
      unit: new FormControl(Validators.required)
    });
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
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
      unitType: this.ingredientForm.controls.unit.value,
      user: this.currentUser._id,
      userEmail: this.currentUser.email
    };
    this.recipeService.createIngredient(obj).subscribe(res => {
      this.dialogRef.close('done');
    }, error => {
      this.dialogRef.close('fail');
    });
  }

}
