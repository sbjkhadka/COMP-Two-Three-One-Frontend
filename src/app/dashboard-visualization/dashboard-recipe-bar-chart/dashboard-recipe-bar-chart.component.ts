import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ThemeService} from '../../shared-services/theme.service';
import {RecipeService} from '../../shared-services/recipe.service';
import {SessionStorageService} from '../../shared-services/session-storage.service';
import {LocalStorageService} from '../../shared-services/services/local-storage.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-dashboard-recipe-bar-chart',
  templateUrl: './dashboard-recipe-bar-chart.component.html',
  styleUrls: ['./dashboard-recipe-bar-chart.component.css']
})
export class DashboardRecipeBarChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private themeService: ThemeService,
    private recipeService: RecipeService,
    private sessionStorageService: SessionStorageService,
    private cdRef: ChangeDetectorRef,
    private localStorageService: LocalStorageService

  ) { }

  stockRecipe = [];
  users = new BehaviorSubject<any[]>([]);
  currentUser;
  recipeInDisplay: any[] = [];
  myRecipees: any[] = [];
  notMyRecipees: any[] = [];
  showingMyRecipeOnly = false;
  fallbackRecipeImage = 'https://aadhyafoodindian.com/img/placeholders/grey_fork_and_knife.png';

  ngOnInit() {

    this.getAllRecipes1();
  }

  getAllRecipes1(): void {
    
    this.myRecipees = [];
    this.notMyRecipees = [];
    this.recipeService.getAllRecipes().subscribe(value => {
      if (value.status === 200) {
        for (let i = 0; i < value.recipes.length; i++) {
          if (value.recipes[i].userEmail === this.currentUser.email) {
            this.myRecipees.push(value.recipes[i]);
          } else {
            this.notMyRecipees.push(value.recipes[i]);
          }
        }
        this.recipeInDisplay.push(...this.myRecipees);
        this.recipeInDisplay.push(...this.notMyRecipees);
      }
    });
  }

}
