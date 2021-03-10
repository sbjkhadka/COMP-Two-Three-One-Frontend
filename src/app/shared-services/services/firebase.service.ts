import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth) { }

  // Handles sign in
  async signin(email: string, password: string)
  {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }


  // Handles new user sign up
  async signup(email: string, password: string)
  {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  // Handles signout
  logout()
  {
    this.firebaseAuth.signOut().then(r => {
      console.log('logged out successfully');
      localStorage.removeItem('user');
    });
  }




}
