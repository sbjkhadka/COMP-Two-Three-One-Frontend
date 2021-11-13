import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Getting token
  getToken(): string {
    return localStorage.getItem('token');
  }

  // Setting token
  setToken(token): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  // Removing token
  removeToken(): boolean {
    localStorage.removeItem('token');
    return !!(localStorage.getItem('token'));
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

  // Removing refresh token
  removeRefreshToken(): boolean {
    localStorage.removeItem('RefreshToken');
    return true;
  }

  // check if user is logged in or not
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // logs out user
  logout(): boolean {
    localStorage.removeItem('token');
    return !localStorage.getItem('token');
  }

  setItem(itemName, item): void {
    localStorage.setItem(itemName, item);
  }

  getItem(itemName: string): any {
    return localStorage.getItem(itemName);
  }
}
