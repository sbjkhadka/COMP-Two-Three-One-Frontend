import {Component, OnInit, ViewChild} from '@angular/core';
import {RegisterAuthComponent} from '../register-auth/register-auth.component';
import {FirebaseService} from '../shared-services/services/firebase.service';
import {RecipeServiceService} from '../shared-services/recipe-service.service';
import {BehaviorSubject} from 'rxjs';
import {ActiveUserSingletonService} from '../shared-services/active-user-singleton.service';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDetailsComponent} from '../recipe-details/recipe-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bannerImage = 'https://www.himalayastrek.com/wp-content/uploads/2019/08/Newari-food-taste-kathmandu.jpg';
  loggedInUser;
  registrationErrorMessage: string;
  @ViewChild('registerAuthComponent') registerAuthComponent: RegisterAuthComponent;
  loggedInUserRecipes = new BehaviorSubject<any[]>(null);
  constructor(
    public firebaseService: FirebaseService,
    public recipeServiceService: RecipeServiceService,
    public activeUserSingletonService: ActiveUserSingletonService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  login(event): void{
    this.loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.activeUserSingletonService.activeUser = this.loggedInUser.uid; // feeding singleton
    console.log('logged_in_user', this.loggedInUser);
    this.recipeServiceService.getRecipeByPartyId(this.loggedInUser.uid).subscribe(res => {
      console.log('response', res);
      // remove this once the backend api is ready
      // const filtered = res.filter(recipe => recipe.party_id === this.loggedInUser.uid);
      this.activeUserSingletonService.activeUserRecipe = res.payload; // feeding singleton
      this.loggedInUserRecipes.next( res.payload);
      console.log('logged_in_user_recipes_inside', this.loggedInUserRecipes);
    });
  }

  register(event): void {
    if (event === false) {
      this.registrationErrorMessage = 'Registration failed';
    } else {
      this.registrationErrorMessage = 'Successfully registered';
    }
  }

  logout(): any {
    localStorage.removeItem('user');
    this.loggedInUser = undefined;

    this.firebaseService.logout();
  }

  recipeItemClicked(item: any): void {
    console.log(item.recipe_name);
    const dialogRef = this.dialog.open(RecipeDetailsComponent,
      {
        height: '800px',
        width: '1000px',
        panelClass: 'no-padding-container',
        data: {
          selectedRecipe: item
        }
      }
    );
    // dialogRef.componentInstance.signUpStatus.subscribe((value) => {
    //   if (value === true) {
    //     this.isSignedIn = true;
    //     this.isLoggedIn.emit(true);
    //   }
    // });
  }
}

