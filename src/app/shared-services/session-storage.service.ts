import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  // Getting token
  getToken(): string {
    return sessionStorage.getItem('token');
  }

  // Setting token
  setToken(token): boolean {
    sessionStorage.setItem('token', token);
    return true;
  }

  // Removing token
  removeToken(): boolean {
    sessionStorage.removeItem('token');
    return !!(sessionStorage.getItem('token'));
  }

  // Getting token
  getRefreshToken(): string {
    return sessionStorage.getItem('RefreshToken');
  }

  // Setting token
  setRefreshToken(token): boolean {
    sessionStorage.setItem('RefreshToken', token);
    return true;
  }

  // Removing refresh token
  removeRefreshToken(): boolean {
    sessionStorage.removeItem('RefreshToken');
    return true;
  }

  // check if user is logged in or not
  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  // logs out user
  logout(): boolean {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('logged_in_user');
    return !sessionStorage.getItem('token');
  }

  setItem(itemName, item): void {
    sessionStorage.setItem(itemName, item);
  }

  getItem(itemName: string): any {
    return sessionStorage.getItem(itemName);
  }
}
