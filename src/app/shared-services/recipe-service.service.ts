import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  constructor(private http: HttpClient) { }

  getRecipeByPartyId(partyId: string): any {
    return this.http.get<any>(environment.base_url + 'recipe/getAllRecipesByUserId?userId=' + partyId).pipe(catchError(error => {
      return throwError(error);
    }));
  }


}
