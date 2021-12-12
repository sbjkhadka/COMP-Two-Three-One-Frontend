import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ThemeService} from '../shared-services/theme.service';
import {RecipeService} from '../shared-services/recipe.service';
import {SessionStorageService} from '../shared-services/session-storage.service';
import {LocalStorageService} from '../shared-services/services/local-storage.service';


@Component({
  selector: 'app-dashboard-visualization',
  templateUrl: './dashboard-visualization.component.html',
  styleUrls: ['./dashboard-visualization.component.css']
})
export class DashboardVisualizationComponent  implements OnInit {

  price = [];
  ingredients = [];
  lowCost = [];
  currentUserEmail;
  totallength;
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      return [
        {title: 'Visualization: Price of Recipes', cols: 1, rows: 1},
      ];
    })
  );

  constructor(
    private themeService: ThemeService,
    private recipeService: RecipeService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    const userString = this.sessionStorageService.getItem('logged_in_user');
    if (userString) {
      this.currentUserEmail = JSON.parse(userString).user.email;
    }
    console.log('currently logged in user', this.currentUserEmail);
    this.getAllRecipes();
    this.getTotalIngredientsByUserEmail();
  }
// this method will get all recipes for the dashboard specifically
  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(value => {
      if (value.status === 200) {
        console.log('value', value);
        value.recipes.forEach(recipe => {
          this.totallength = this.price.push(recipe.price);
          if (recipe.price <= 3) {
            this.lowCost.push(Number(recipe.price));
          }
          });
      }
    });
  }
// this method will get the total ingredients by user email
  getTotalIngredientsByUserEmail(): void {
    this.recipeService.getAllIngredients(this.currentUserEmail).subscribe(ingredients => {
      ingredients.ingredients[0].forEach(ing => {
        this.ingredients.push(ing);
      });
    });
  }

}
