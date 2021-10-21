import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  destroyLoggedInUser() {
    // localStorage.getItem('user').des
  }
}
