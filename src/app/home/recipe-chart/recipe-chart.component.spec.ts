import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeChartComponent } from './recipe-chart.component';

describe('RecipeChartComponent', () => {
  let component: RecipeChartComponent;
  let fixture: ComponentFixture<RecipeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
