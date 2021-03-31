import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserSingletonService {

  constructor() { }

  // activeUser: string = null;
  // activeUserDetails: any = null;
  // activeUserRecipe: any[];

  activeUser = new BehaviorSubject<string>(null);
  activeUserDetails = new BehaviorSubject<any>(null);
  activeUserRecipe = new BehaviorSubject<any[]>(null);
  adminUserRecipe = new BehaviorSubject<any[]>(null);
  activeUserSelectedRecipe = new BehaviorSubject<any[]>([]);
}
