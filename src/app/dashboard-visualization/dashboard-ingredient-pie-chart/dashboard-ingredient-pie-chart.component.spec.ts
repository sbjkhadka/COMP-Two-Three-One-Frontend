import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIngredientPieChartComponent } from './dashboard-ingredient-pie-chart.component';

describe('DashboardIngredientPieChartComponent', () => {
  let component: DashboardIngredientPieChartComponent;
  let fixture: ComponentFixture<DashboardIngredientPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardIngredientPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIngredientPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
