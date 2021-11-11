import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {AngularRegistrationService} from '../shared-services/services/angular-registration.service';
import {User} from '../shared-models/user.model';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.css']
})
export class RegisterAuthComponent implements OnInit {
  constructor(public firebaseService: FirebaseService,
              private angularRegistrationService: AngularRegistrationService,
              public dialogRef: MatDialogRef<RegisterAuthComponent>,
              public recipeServiceService: RecipeServiceService,
              private formBuilder: FormBuilder) {
    // this.getAllRoles();
    this.initializeForm();

  }

  siteKey = '6LeD-CgdAAAAADt6twkJVsYFYjP5lsm64GJczRiM';
  isSignedIn = false;
  // @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>(); // sign up status should emit true if successfully signed in
  userRegistered;
  registrationFailure = 'Registration failed';
  public registrationForm: FormGroup;

  roles = [];
  matcher = new MyErrorStateMatcher();
  botCheckPass = false;

  ngOnInit(): void {
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
    });
    // const userDetails = {
    //   email: this.registrationForm.value.emailSignup,
    //   password: this.registrationForm.value.passwordSignup,
    //   firstName: this.registrationForm.value.firstNameSignup,
    //   lastName: this.registrationForm.value.lastNameSignup,
    //   role: this.registrationForm.value.roleSignup,
    // };
    //
    // await this.firebaseService.signUp(userDetails).then(() => {
    //   this.userRegistered = true;
    //   this.dialogRef.close();
    //   this.signUpStatus.emit(true);
    // }).catch((error) => {
    //   this.userRegistered = false;
    //   this.signUpStatus.emit(false);
    //   console.log('Signup Error:', error);
    // });
    // if (this.firebaseService.isLoggedIn) {
    //   this.isSignedIn = true;
    //   // this.isLoggedIn.emit(true);
    // }
  }

  // tslint:disable-next-line:typedef
  // async onSignIn(email: string, password: string) {
  //   console.log('signing in');
  //   await this.firebaseService.signin(email, password);
  //   if (this.firebaseService.isLoggedIn) {
  //     this.isSignedIn = true;
  //     this.isLoggedIn.emit(true);
  //   }
  // }

  // tslint:disable-next-line:typedef
  // handleLogout(){
  //   this.firebaseService.logOut();
  //   this.isLoggedIn.emit(false);
  // }

  close(): void {
    this.dialogRef.close();
  }

    // modify this
  // getAllRoles() {
  //   this.recipeServiceService.getAllRoles().subscribe(res => {
  //     console.log('roles', res.payload);
  //     this.roles = res.payload;
  //   });
  // }

  checkPasswords(group: FormGroup): any{ // here we have the 'passwords' group
    // console.log('checking pass' + this.registrationForm.value.passwordSignup + ',' + this.registrationForm.value.rePasswordSignup);
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



