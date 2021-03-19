import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  constructor(public firebaseAuth: AngularFireAuth,
              private http: HttpClient) { }

  // Handles sign in
  async signin(email: string, password: string)
  {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('current_user', res.user);
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  // tslint:disable-next-line:typedef
  async signUp(userDetails: any)
  {
    await this.firebaseAuth.createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then(async res => {
        console.log('current_user', res.user);
        this.sendNewUserToBackEnd(res.user.uid, userDetails.role).subscribe(resU => {
          console.log('user_created', resU);
        });
        await res.user.updateProfile({
          displayName: `${userDetails.firstName} ${userDetails.lastName}`,
        }).then(res1 => {
          console.log('User Profile updated');
        });
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }


  // Handles signout
  // tslint:disable-next-line:typedef
  logOut()
  {
    this.firebaseAuth.signOut().then(r => {
      console.log('logged out successfully');
      localStorage.removeItem('user');
    });
  }


  sendNewUserToBackEnd(user: string, role: any): any {
    const obj = {
      role: Number(role),
      userId: user
    };

    console.log('user_sent', JSON.stringify( obj));
    console.log(environment.base_url + 'party');
    return this.http.post<any>(environment.base_url + 'party', obj).pipe(catchError(error => {
      console.log('error_post', error);
      return throwError(error);
    }));
  }
}
