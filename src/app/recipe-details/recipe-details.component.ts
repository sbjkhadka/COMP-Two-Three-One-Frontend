import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ThemeService} from '../shared-services/theme.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  theme: string;
  recipeDetail: any;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<RecipeDetailsComponent>,
              private themeService: ThemeService) {
    console.log('inside component:', data.selectedRecipe);
    this.recipeDetail = data.selectedRecipe;
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
