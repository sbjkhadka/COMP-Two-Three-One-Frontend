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
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
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
import {AuthGuard} from './shared-services/auth.guard';
import {NgxCaptchaModule} from 'ngx-captcha';
import { InfoDialogComponent } from './home/generic-dialogs/info-dialog/info-dialog.component';
import {ColorPickerModule} from 'ngx-color-picker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {CommonModule} from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { SupportFeedbackComponent } from './support-feedback/support-feedback.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SupportFeedbackDetailsComponent } from './support-feedback/support-feedback-details/support-feedback-details.component';
import { ThemeDirective } from './directives/theme.directive';
import { ControlsWrapperComponent } from './lib/controls-wrapper/controls-wrapper.component';
import { InputRefDirective } from './lib/controls-wrapper/common/input-ref.directive';

const routes: Routes = [

  { path: 'login', component: AngularLoginComponent },
  { path: 'register', component: RegisterAuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'myRecipe', component: MyRecipeListComponent, canActivate: [AuthGuard] },
  { path: 'calorieChecker', component: CalorieCheckerComponent, canActivate: [AuthGuard] },
  { path: 'contactUs', component: ContactUsComponent, canActivate: [AuthGuard] },
  { path: 'createUser', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'userList', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'supportAndFeedback', component: SupportFeedbackComponent, canActivate: [AuthGuard] },
  { path: 'supportAndFeedback/:id', component: SupportFeedbackDetailsComponent, canActivate: [AuthGuard] }
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
    ContactUsComponent,
    RegisterComponent,
    UserListComponent,
    SupportFeedbackComponent,
    SupportFeedbackDetailsComponent,
    ThemeDirective,
    ControlsWrapperComponent,
    InputRefDirective,
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
    ColorPickerModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    CommonModule,
    FormlyModule.forRoot({extras: {lazyRender: true}}),
    FormlyBootstrapModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
