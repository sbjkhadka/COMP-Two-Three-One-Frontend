import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularLoginService} from '../shared-services/angular-login.service';
import {LocalStorageService} from '../shared-services/local-storage.service';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../home/generic-dialogs/info-dialog/info-dialog.component';
import {InfoDialog} from '../shared-models/info-dialog.model';
import {ThemeService} from '../shared-services/theme.service';
import {SessionStorageService} from '../shared-services/session-storage.service';

@Component({
  selector: 'app-angular-login',
  templateUrl: './angular-login.component.html',
  styleUrls: ['./angular-login.component.css']
})
export class AngularLoginComponent implements OnInit, OnDestroy {

  theme: string;
  constructor(private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService,
              public dialog: MatDialog,
              private themeService: ThemeService,
              private sessionStorageService: SessionStorageService) { }
  credentials = {
    email: '',
    password: ''
  };

  displayedForm = 1;
  loginForm: FormGroup;
  forgotPasswordEmailForm: FormGroup;
  forgotPasswordSecurityQuestionForm: FormGroup;
  forgotPasswordNewPasswordForm: FormGroup;

  forgotPasswordEmailError = false;
  securityAnswerError = false;
  resetPasswordError = false;
  resetPasswordAPIError = false;
  info: InfoDialog = {
    infoName: 'Password Reset',
    infoType: 'Successful'
  };

  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.initializeForm();
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
          this.sessionStorageService.setItem('logged_in_user', JSON.stringify(value));
          this.sessionStorageService.setToken(value.accessToken);
        }

        if (value && value.refreshToken) {
          this.sessionStorageService.setRefreshToken(value.refreshToken);
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

    this.forgotPasswordEmailForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });

    this.forgotPasswordSecurityQuestionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    });

    this.forgotPasswordNewPasswordForm = new FormGroup({
      newPassword1: new FormControl('', Validators.required),
      newPassword2: new FormControl('', Validators.required)
    });
  }

  switchForm(formNumber: number): void {
    this.displayedForm = formNumber;
  }
  onReset(step: number): void {
    const email = this.forgotPasswordEmailForm.value.email;
    switch (step) {
      case 2: {
        if (email) {
          this.angularLoginService.getSecurityQuestionByEmail(email).subscribe(value => {
            if (value.status === 200) {
              this.forgotPasswordSecurityQuestionForm.patchValue({
                question: value.securityQuestion
              });
              this.displayedForm = step;
            } else {
              this.forgotPasswordEmailError = true;
            }
          });
        } else {
          this.forgotPasswordEmailError = true;
        }

        break;
      }
      case 3: {
        const queryObject = {
          email,
          securityAnswer: this.forgotPasswordSecurityQuestionForm.value.answer
        };
        this.angularLoginService.checkIfSecurityAnswerIsOkay(queryObject).subscribe(value => {
          if (value.status === 200) {
            this.displayedForm = step;
          } else {
            this.securityAnswerError = true;
          }
        });
        break;
      }
      case 4: {
        const password = this.forgotPasswordNewPasswordForm.value.newPassword1;
        const rePassword = this.forgotPasswordNewPasswordForm.value.newPassword2;
        if (password.toString() !== rePassword.toString()) {
          this.resetPasswordError = true;
        } else {
          const queryObject = {
            email,
            password: this.forgotPasswordNewPasswordForm.value.newPassword1
          };
          this.angularLoginService.resetUserPassword(queryObject).subscribe(value => {
            if (value.status === 200) {
              this.dialog.open(InfoDialogComponent, {
                height: '200px',
                width: '500px',
                panelClass: 'no-padding-container',
                data: {
                  infoName: this.info.infoName,
                  infoType: this.info.infoType
                }
              }).afterClosed().subscribe(res => {
                this.info = null;
                window.location.href = '/login';
              });
            } else {
              this.resetPasswordAPIError = true;
            }
          });
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.forgotPasswordEmailError = false;
    this.securityAnswerError = false;
    this.resetPasswordError = false;
    this.resetPasswordAPIError = false;
  }
}
