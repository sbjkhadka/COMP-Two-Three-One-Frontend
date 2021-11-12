import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIngredientsComponent } from './chart-ingredients.component';

describe('ChartIngredientsComponent', () => {
  let component: ChartIngredientsComponent;
  let fixture: ComponentFixture<ChartIngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartIngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
