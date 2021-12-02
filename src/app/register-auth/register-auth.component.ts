import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AngularRegistrationService} from '../shared-services/services/angular-registration.service';
import {User} from '../shared-models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';
import {InfoDialogComponent} from '../home/generic-dialogs/info-dialog/info-dialog.component';
import {InfoDialog} from '../shared-models/info-dialog.model';
import {ThemeService} from '../shared-services/theme.service';


@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.css']
})
export class RegisterAuthComponent implements OnInit {
  theme: string;
  constructor(private angularRegistrationService: AngularRegistrationService,
              public dialogRef: MatDialogRef<RegisterAuthComponent>,
              private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private themeService: ThemeService) {
    this.initializeForm();
  }

  siteKey = '6LeD-CgdAAAAADt6twkJVsYFYjP5lsm64GJczRiM';
  isSignedIn = false;
  @Output() signUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>(); // sign up status should emit true if successfully signed in
  userRegistered;
  registrationFailure = 'Registration failed';
  public registrationForm: FormGroup;

  roles = [];
  matcher = new MyErrorStateMatcher();
  botCheckPass = false;
  info: InfoDialog = {
    infoName: '',
    infoType: ''
  };
  ngOnInit(): void {
    this.themeService.theme.subscribe(value => {
      this.theme = value;
    });
    this.isSignedIn = localStorage.getItem('user') !== null;
  }

  initializeForm(): void{
    this.registrationForm = this.formBuilder.group({
      emailSignup: new FormControl('', Validators.required),
      passwordSignup: new FormControl('', Validators.required),
      rePasswordSignup: new FormControl(''),
      firstNameSignup: new FormControl(''),
      lastNameSignup: new FormControl(''),
      roleSignup: new FormControl(1),
      securityQuestionSignup: new FormControl(''),
      securityAnswerSignup: new FormControl(''),
      recaptcha: new FormControl('', Validators.required)
    }, {validator: this.checkPasswords});
  }


  // tslint:disable-next-line:typedef
  async onSignUp() {
    const user: User = {
      email: this.registrationForm.value.emailSignup,
      firstName: this.registrationForm.value.firstNameSignup,
      lastName: this.registrationForm.value.lastNameSignup,
      role: this.registrationForm.value.roleSignup,
      password: this.registrationForm.value.passwordSignup,
      securityQuestion: this.registrationForm.value.securityQuestionSignup,
      securityAnswer: this.registrationForm.value.securityAnswerSignup,
    };
    this.angularRegistrationService.register(user).subscribe(value => {
      console.log('user registered successfully', value);
      // tslint:disable-next-line:prefer-const
      if (value.status === 200) {
        this.info.infoName = 'Registration';
        this.info.infoType = 'Success';
      } else {
        this.info.infoName = 'Registration';
        this.info.infoType = 'Success';
      }

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
        this.close();
      });
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  checkPasswords(group: FormGroup): any{ // here we have the 'passwords' group
    const pass = group.controls.passwordSignup.value;
    const confirmPass = group.controls.rePasswordSignup.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  captchaSuccess(event): void {
    this.botCheckPass = true;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}



