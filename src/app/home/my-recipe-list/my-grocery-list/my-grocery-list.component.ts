import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {element} from 'protractor';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-my-grocery-list',
  templateUrl: './my-grocery-list.component.html',
  styleUrls: ['./my-grocery-list.component.css']
})
export class MyGroceryListComponent implements OnInit {
  groceryList$ = new BehaviorSubject<any>(null);
  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<MyGroceryListComponent>) {
    this.finalRecipeList = data.finalRecipeList;
    dialogRef.disableClose = true;
    this.generateConsolidatedList(data.finalRecipeList);
  }

  finalRecipeList;
  consolidatedList;

  printObj = [];

  ngOnInit(): void {
  }
  close(): void {
    this.dialogRef.close();
  }
  generateConsolidatedList(finalList): void {
   const tempList = [];
   for (let i = 0; i < finalList.length; i++) {
     let overallQty = 1;
     for (let j = 0; j < finalList[i].recipeItem.length; j++) {
        overallQty = (Number(finalList[i].recipeItem[j].itemQuantity) * Number(finalList[i].quantity));
        finalList[i].recipeItem[j].itemQuantity = overallQty;
        tempList.push(finalList[i].recipeItem[j]);
      }
    }

   this.consolidatedList = tempList;
   // Logic for grouping ingredients in arrays based on ingredientId
   const guideArray = [...new Set(tempList.map(item => item._id))].sort((a, b) => a - b);
   const realArray = [];
   guideArray.map(e => {realArray.push([]); });

   for (const item of tempList) {
     const index = guideArray.findIndex(guide => guide === item._id);
     if (index >= 0) {
       realArray[index].push(item);
     }

   }
   for (let i = 0; i < realArray.length; i++) {
     const obj = {
       ingredientName: realArray[i][0].ingredientName,
       unit: realArray[i][0].unitType,
       quantity: 0
     };
     let quantity = 0;
     for (let j = 0; j < realArray[i].length; j++) {
       quantity += Number(realArray[i][j].itemQuantity);
     }
     obj.quantity = quantity;
     this.printObj.push(obj);

   }
   this.groceryList$.next(this.printObj);
  }



}
