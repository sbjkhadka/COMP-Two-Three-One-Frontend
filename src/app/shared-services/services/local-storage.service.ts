import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Setting token
  setToken(token): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  // Getting token
  getRefreshToken(): string {
    return localStorage.getItem('RefreshToken');
  }

  // Setting token
  setRefreshToken(token): boolean {
    localStorage.setItem('RefreshToken', token);
    return true;
  }

  // Getting token
  getToken(): string {
    return localStorage.getItem('token');
  }

  // check if user is logged in or not
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // logs out user
  logout(): boolean {
    localStorage.removeItem('token');
    return true;
  }

  setItem(itemName, item): void {
    localStorage.setItem(itemName, item);
  }
}
