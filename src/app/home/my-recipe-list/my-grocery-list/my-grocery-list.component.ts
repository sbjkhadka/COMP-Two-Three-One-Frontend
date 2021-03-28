import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-my-grocery-list',
  templateUrl: './my-grocery-list.component.html',
  styleUrls: ['./my-grocery-list.component.css']
})
export class MyGroceryListComponent implements OnInit {

  finalRecipeList;
  consolidatedList;
  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<MyGroceryListComponent>) {
    this.finalRecipeList = data.finalRecipeList;
    dialogRef.disableClose = true;
    this.generateConsolidatedList(data.finalRecipeList);
  }

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }

  generateConsolidatedList(finalList): void {
   const tempList = [];
    for (let i = 0; i < finalList.length; i++) {
      for (let j = 0; j < finalList[i].recipeItemList.length; j++) {
        tempList.push(finalList[i].recipeItemList[j]);
      }
    }

   this.consolidatedList = tempList;
  }

}
