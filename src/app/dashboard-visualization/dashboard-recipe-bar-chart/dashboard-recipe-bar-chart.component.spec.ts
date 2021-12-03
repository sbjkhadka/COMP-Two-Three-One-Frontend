import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecipeBarChartComponent } from './dashboard-recipe-bar-chart.component';

describe('DashboardRecipeBarChartComponent', () => {
  let component: DashboardRecipeBarChartComponent;
  let fixture: ComponentFixture<DashboardRecipeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRecipeBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRecipeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
