import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {MatDialog} from '@angular/material/dialog';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  isSignedIn = false;
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public loginForm: FormGroup;
  constructor(public firebaseService: FirebaseService,
              public dialog: MatDialog) {
    this.initializeForm();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  async onSignIn(email: string, password: string) {
    await this.firebaseService.signin(this.loginForm.value.email, this.loginForm.value.password);
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true;
      this.isLoggedIn.emit(true);
    }
  }

  // tslint:disable-next-line:typedef
  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegisterAuthComponent,
      {
        height: '650px',
        width: '500px',
        panelClass: 'no-padding-container'
      }
      );
    dialogRef.componentInstance.signUpStatus.subscribe((value) => {
      if (value === true) {
        this.isSignedIn = true;
        this.isLoggedIn.emit(true);
      }
    });
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('a@b.com'),
      password: new FormControl('<1234567890>')
    });
  }

}
