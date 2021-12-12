import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import {ThemeService} from '../../shared-services/theme.service';
import {RecipeService} from '../../shared-services/recipe.service';

@Component({
  selector: 'app-dashboard-ingredient-pie-chart',
  templateUrl: './dashboard-ingredient-pie-chart.component.html',
  styleUrls: ['./dashboard-ingredient-pie-chart.component.css']
})
export class DashboardIngredientPieChartComponent implements OnInit {
  totalRecipes = 0;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
   public pieChartData: SingleDataSet = [0, 3, 5, 6, 7];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  currentUser;
  price = [];
  public pieChartLabels: Label[] = ['0-$3', '$4-$9', '$10-$12', '$13-$15', '$15+'];
  priceRange = [0, 0, 0, 0, 0];

  constructor(   private themeService: ThemeService,
                 private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

// this method will get all recipes for the pie chart specifically
  getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(value => {
      if (value.status === 200) {
        value.recipes.forEach(recipe => {
          this.price.push(recipe.price);
        });
        this.preparePriceRangebarGraph();
      }
    });
  }
// this method will use if/else for the pie chart

  preparePriceRangebarGraph(): void {
    if (this.price && this.price.length > 0) {
      this.price.forEach(p => {
        const pValue = Number(p) || 0;
        this.totalRecipes += pValue;
        if (pValue <= 3) {
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
      this.pieChartData = this.priceRange;
    }
  }
}
