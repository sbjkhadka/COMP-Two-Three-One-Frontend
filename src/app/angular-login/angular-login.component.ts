import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AngularLoginService} from '../shared-services/services/angular-login.service';
import {LocalStorageService} from '../shared-services/services/local-storage.service';

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
  public loginForm: FormGroup;

  constructor(private angularLoginService: AngularLoginService,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    console.log('form is submitted');
  }

  openRegistrationDialog() {}
  onSignIn() {
    this.credentials.email =  this.loginForm.value.email;
    this.credentials.password = this.loginForm.value.password;

    if (this.loginForm.value.email && this.loginForm.value.password) {
      this.angularLoginService.signIn(this.credentials).subscribe(value => {
        if (value && value.accessToken) {
          this.localStorageService.setToken(value.accessToken);
        }

        if (value && value.refreshToken) {
          this.localStorageService.setRefreshToken(value.refreshToken);
        }
        window.location.href = '/home';
        console.log('logged in as', value);
      });
    }


  }
  initializeForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('subarna.khadka@acme.edu.np'),
      password: new FormControl('password')
    });
  }


}
