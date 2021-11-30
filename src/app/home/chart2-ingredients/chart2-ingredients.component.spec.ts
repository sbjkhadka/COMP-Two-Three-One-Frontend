import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart2IngredientsComponent } from './chart2-ingredients.component';

describe('Chart2IngredientsComponent', () => {
  let component: Chart2IngredientsComponent;
  let fixture: ComponentFixture<Chart2IngredientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chart2IngredientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chart2IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
