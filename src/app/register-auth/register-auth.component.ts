import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LoginAuthComponent} from '../login-auth/login-auth.component';

class DialogData {
}

@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.css']
})
export class RegisterAuthComponent implements OnInit {

  isSignedIn = false;
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  userRegistered;
  registrationFailure = 'Registration failed';
  constructor(public firebaseService: FirebaseService,
              public dialogRef: MatDialogRef<RegisterAuthComponent>) {
  }

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('user') !== null;
  }


  // tslint:disable-next-line:typedef
  async onSignUp(email: string, password: string) {
    await this.firebaseService.signup(email, password).then(() => {
      this.userRegistered = true;
      this.dialogRef.close();
      this.signUpStatus.emit(true);
    }).catch((error) => {
      this.userRegistered = false;
      this.signUpStatus.emit(false);
      console.log('Signup Error:', error);
    });
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.isLoggedIn.emit(true);
    }
  }

  // tslint:disable-next-line:typedef
  async onSignIn(email: string, password: string) {
    console.log('signing in');
    await this.firebaseService.signin(email, password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.isLoggedIn.emit(true);
    }
  }

  // tslint:disable-next-line:typedef
  handleLogout(){
    this.firebaseService.logout();
    this.isLoggedIn.emit(false);
  }

  close(){
    this.dialogRef.close();
  }

}



