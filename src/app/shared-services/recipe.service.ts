import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environmentAngular} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<any> {
    return this.http.get<any>(`${environmentAngular.base_url}allRecipes`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete<any>(`${environmentAngular.base_url}recipe/?recipeId=${recipeId}`).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
