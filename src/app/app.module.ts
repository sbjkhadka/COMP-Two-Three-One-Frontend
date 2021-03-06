import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {FirebaseService} from './shared-services/services/firebase.service';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from './shared-services/authentication.service';
import { LoginAuthComponent } from './login-auth/login-auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { TestComponent } from './test/test.component';
import {DefaultAvatarPipe} from './shared-methods/global-pipes';
import {RecipeServiceService} from './shared-services/recipe-service.service';
import {HttpClientModule} from '@angular/common/http';
import {ActiveUserSingletonService} from './shared-services/active-user-singleton.service';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddNewRecipeComponent } from './add-new-recipe/add-new-recipe.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MyRecipeListComponent } from './home/my-recipe-list/my-recipe-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatAutocomplete} from '@angular/material/autocomplete';
import { AddNewIngredientComponent } from './home/add-new-ingredient/add-new-ingredient.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from './home/generic-dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MyGroceryListComponent } from './home/my-recipe-list/my-grocery-list/my-grocery-list.component';
import {NgxPrintModule} from 'ngx-print';
import { PrintMyGroceryComponent } from './home/my-recipe-list/my-grocery-list/print-my-grocery/print-my-grocery.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CalorieCheckerComponent } from './calorie-checker/calorie-checker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatNativeDateModule} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'myRecipe', component: MyRecipeListComponent},
  {path: 'calorieChecker', component: CalorieCheckerComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterAuthComponent,
    LoginAuthComponent,
    TestComponent,
    DefaultAvatarPipe,
    RecipeDetailsComponent,
    AddNewRecipeComponent,
    MyRecipeListComponent,
    AddNewIngredientComponent,
    ConfirmationDialogComponent,
    MyGroceryListComponent,
    PrintMyGroceryComponent,
    CalorieCheckerComponent,
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
        HttpClientModule,
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCheckboxModule,
        NgxPrintModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatNativeDateModule,
        MatRadioModule
    ],
  providers: [FirebaseService,
              AuthenticationService,
              RecipeServiceService,
              ActiveUserSingletonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
