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
  totalRecipes = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['a', '2007', '2008', '2009', '2010', '2011', '2012','a', '2007', '2008', '2009', '2010', '2011'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  price = [];
  barLabel: Label[] = ['0-$3','$4-$9','$10-$12','$13-$15','$15+'];
  priceRange = [0, 0, 0, 0, 0];
  public barChartData: ChartDataSets[] = [
    { data: this.priceRange, label: 'Price of Recipe' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
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
    this.recipeService.getAllRecipes().subscribe(value => {
      if (value.status === 200) {
        console.log('value', value);
        value.recipes.forEach(recipe => {
          this.price.push(recipe.price);
        });
        this.preparePriceRangebarGraph();
      }
    });
    console.log('price_list', this.price);
  }


preparePriceRangebarGraph() {

    if(this.price && this.price.length > 0) {
      this.price.forEach(p => {
        const pValue = Number(p) || 0;
        this.totalRecipes += pValue;
        if(pValue <= 3) {
          this.priceRange[0]++;
        } else if (pValue > 3 && pValue <= 9) {
          this.priceRange[1]++;
        }else if (pValue > 9 && pValue <= 12) {
          this.priceRange[2]++;
        }else if (pValue > 12 && pValue <= 15) {
          this.priceRange[3]++;
        }else if (pValue > 15) {
          this.priceRange[4]++;
        }

      });
      console.log('price_range', this.priceRange);
    }

}

}
