import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {RecipeServiceService} from '../shared-services/recipe-service.service';


@Component({
  selector: 'app-register-auth',
  templateUrl: './register-auth.component.html',
  styleUrls: ['./register-auth.component.css']
})
export class RegisterAuthComponent implements OnInit {
  constructor(public firebaseService: FirebaseService,
              public dialogRef: MatDialogRef<RegisterAuthComponent>,
              public recipeServiceService: RecipeServiceService) {
    this.getAllRoles();
    this.initializeForm();

  }

  isSignedIn = false;
  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() signUpStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  userRegistered;
  registrationFailure = 'Registration failed';
  public registrationForm: FormGroup;

  roles = [];

  ngOnInit(): void {
    this.isSignedIn = localStorage.getItem('user') !== null;
  }

  initializeForm(): void{
    this.registrationForm = new FormGroup({
      emailSignup: new FormControl(''),
      passwordSignup: new FormControl(''),
      firstNameSignup: new FormControl(''),
      lastNameSignup: new FormControl(''),
      roleSignup: new FormControl(1),
    });
  }


  // tslint:disable-next-line:typedef
  async onSignUp() {
    const userDetails = {
      email: this.registrationForm.value.emailSignup,
      password: this.registrationForm.value.passwordSignup,
      firstName: this.registrationForm.value.firstNameSignup,
      lastName: this.registrationForm.value.lastNameSignup,
      role: this.registrationForm.value.roleSignup,
    };

    await this.firebaseService.signUp(userDetails).then(() => {
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
    this.firebaseService.logOut();
    this.isLoggedIn.emit(false);
  }

  close() {
    this.dialogRef.close();
  }

    // modify this
  getAllRoles() {
    this.recipeServiceService.getAllRoles().subscribe(res => {
      console.log('roles', res.payload);
      this.roles = res.payload;
    });
  }

}



