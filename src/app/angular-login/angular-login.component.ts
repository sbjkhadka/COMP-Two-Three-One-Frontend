import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularLoginService} from '../shared-services/services/angular-login.service';
import {LocalStorageService} from '../shared-services/services/local-storage.service';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../home/generic-dialogs/info-dialog/info-dialog.component';

@Component({
  selector: 'app-angular-login',
  templateUrl: './angular-login.component.html',
  styleUrls: ['./angular-login.component.css']
})
export class AngularLoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  displayedForm = 1;
  public loginForm: FormGroup;

  constructor(private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit(): void {
    console.log('form is submitted');
  }

  openRegistrationDialog(): void {
    this.dialog.open(RegisterAuthComponent,
      {
        height: '820px',
        width: '600px',
        panelClass: 'no-padding-container'
      }
    );
  }
  onSignIn(): void {
    this.credentials.email =  this.loginForm.value.email;
    this.credentials.password = this.loginForm.value.password;

    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.angularLoginService.signIn(this.credentials).subscribe(value => {
        if (value && value.accessToken) {
          this.localStorageService.setItem('logged_in_user', JSON.stringify(value));
          this.localStorageService.setToken(value.accessToken);
        }

        if (value && value.refreshToken) {
          this.localStorageService.setRefreshToken(value.refreshToken);
        }
        window.location.href = '/home';
      });
    }
  }

  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('subarna.khadka@acme.edu.np'),
      password: new FormControl('password')
    });
  }

  switchForm(formNumber: number): void {
    this.displayedForm = formNumber;
  }

  onReset(step: number): void {
    this.displayedForm = 2;
  }
}
