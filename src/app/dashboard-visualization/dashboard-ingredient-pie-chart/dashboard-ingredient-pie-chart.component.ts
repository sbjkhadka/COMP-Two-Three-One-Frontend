import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import {ThemeService} from '../../shared-services/theme.service';
import {RecipeService} from '../../shared-services/recipe.service';
import {SessionStorageService} from '../../shared-services/session-storage.service';
import {LocalStorageService} from '../../shared-services/services/local-storage.service';

@Component({
  selector: 'app-dashboard-ingredient-pie-chart',
  templateUrl: './dashboard-ingredient-pie-chart.component.html',
  styleUrls: ['./dashboard-ingredient-pie-chart.component.css']
})
export class DashboardIngredientPieChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Ingredient Visualization', 'In-Store Sales', 'Mail Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(   private themeService: ThemeService,
                 private recipeService: RecipeService,
                 private sessionStorageService: SessionStorageService,
                 private cdRef: ChangeDetectorRef,
                 private localStorageService: LocalStorageService) { }

  ngOnInit() {


  }

}
