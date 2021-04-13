import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  constructor(private http: HttpClient) { }

  testObj = {
    status: 'OK',
    payload: [
      {
        recipeId: 17,
        recipeName: 'Pani Puri',
        description: 'This is pani puri',
        price: '0.5',
        recipePhoto: 'https://static.toiimg.com/photo/63185231.cms?width=500&resizemode=4&imgsize=135525',
        partyId: 'GJl6QwM6G8hnEl1mnlmguIRvnUs2',
        roleId: 2,
        roleName: 'Trainer',
        recipeItemList: [
          {
            itemId: 31,
            itemQuantity: '6',
            ingredientId: 2,
            recipeId: 17,
            ingredientName: 'Tomato',
            unitType: 'grams',
            calorie: '2'
          },
          {
            itemId: 32,
            itemQuantity: '5',
            ingredientId: 5,
            recipeId: 17,
            ingredientName: 'Water',
            unitType: 'liter',
            calorie: '0'
          }
        ]
      },
      {
        recipeId: 18,
        recipeName: 'Samosa Chat',
        description: 'This is samosa chat',
        price: '0.5',
        recipePhoto: 'https://fauziaskitchenfun.com/wp-content/uploads/2015/07/22-1024x765.jpg',
        partyId: 'GJl6QwM6G8hnEl1mnlmguIRvnUs2',
        roleId: 2,
        roleName: 'Trainer',
        recipeItemList: [
          {
            itemId: 33,
            itemQuantity: '4',
            ingredientId: 2,
            recipeId: 18,
            ingredientName: 'Tomato',
            unitType: 'grams',
            calorie: '2'
          },
          {
            itemId: 34,
            itemQuantity: '3',
            ingredientId: 10,
            recipeId: 18,
            ingredientName: 'Corn Flour',
            unitType: 'kg',
            calorie: '170'
          }
        ]
      }
    ]
  };

  getRecipeByPartyId(partyId: string): any {
    return this.http.get<any>(environment.base_url + 'recipe/getAllRecipesByUserId?userId=' + partyId).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  getAllStockRecipe(): any {
    return this.http.get<any>('https://raw.githubusercontent.com/sbjkhadka/test-repo/master/stock').pipe(catchError(error => {
      return throwError(error);
    }));
  }

  createRecipe(recipeObject: any): any {
    console.log('create', recipeObject);
    return this.http.post<any>(environment.base_url + 'recipe', recipeObject).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  getAllIngredients(): any {
    return this.http.get<any>(environment.base_url + 'ingredient/getAll').pipe(catchError(error => {
      return throwError(error);
    }));
  }

  createIngredient(ingredientObject: any): any {
    return this.http.post<any>(environment.base_url + 'ingredient', ingredientObject).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  deleteRecipe(recipeId, userId): any {
    return this.http.delete<any>(environment.base_url + 'recipe/' + recipeId + '/' + userId).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  updateRecipe(recipeId, recipeObject): any {
    console.log('recipe obj', recipeObject);
    const params = new HttpParams()
      .set('recipeId', recipeId);
    return this.http.put<any>(environment.base_url + 'recipe/updateRecipe', recipeObject, {params}).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  // Change this api
  getAllRoles(): any {
    return this.http.get<any>(environment.base_url + 'party/getAllMembers').pipe(catchError(error => {
      return throwError(error);
    }));
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(environment.base_url + 'party/getAllMembers').pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
