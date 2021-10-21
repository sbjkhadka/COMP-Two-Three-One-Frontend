import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipeDetail: any;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<RecipeDetailsComponent>) {
    console.log('inside component:', data.selectedRecipe);
    this.recipeDetail = data.selectedRecipe;
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
