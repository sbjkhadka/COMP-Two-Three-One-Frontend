import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserSingletonService {

  constructor() { }

  activeUser: string = null;
  activeUserRecipe: any[];
}
