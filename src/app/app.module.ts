import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {FirebaseService} from './shared-services/services/firebase.service';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './shared-services/authentication.service';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterAuthComponent,
    LoginAuthComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(
      {
        apiKey: 'AIzaSyBt1aASZOPZ2em0G1IVGxOMN0iJM3wseo8',
        authDomain: 'grocery-admin-9bc92.firebaseapp.com',
        projectId: 'grocery-admin-9bc92',
        storageBucket: 'grocery-admin-9bc92.appspot.com',
        messagingSenderId: '895704770040',
        appId: '1:895704770040:web:65d862dacb4c2ec9fa220d'
      }
    ),
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [FirebaseService,
              AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
