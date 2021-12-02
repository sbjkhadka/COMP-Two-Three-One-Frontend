import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterAuthComponent } from './register-auth/register-auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {DefaultAvatarPipe} from './shared-methods/global-pipes';
import {HttpClientModule} from '@angular/common/http';
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
import { AngularLoginComponent } from './angular-login/angular-login.component';
import {AuthGuard} from './shared-services/services/auth.guard';
import {NgxCaptchaModule} from 'ngx-captcha';
import { InfoDialogComponent } from './home/generic-dialogs/info-dialog/info-dialog.component';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [

  {path: 'login', component: AngularLoginComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'myRecipe', component: MyRecipeListComponent, canActivate: [AuthGuard]},
  {path: 'calorieChecker', component: CalorieCheckerComponent, canActivate: [AuthGuard]}
];
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterAuthComponent,
    DefaultAvatarPipe,
    RecipeDetailsComponent,
    AddNewRecipeComponent,
    MyRecipeListComponent,
    AddNewIngredientComponent,
    ConfirmationDialogComponent,
    MyGroceryListComponent,
    PrintMyGroceryComponent,
    CalorieCheckerComponent,
    AngularLoginComponent,
    InfoDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
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
    MatRadioModule,
    NgxCaptchaModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
