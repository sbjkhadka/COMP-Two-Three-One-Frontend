import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieCheckerComponent } from './calorie-checker.component';

describe('CalorieCheckerComponent', () => {
  let component: CalorieCheckerComponent;
  let fixture: ComponentFixture<CalorieCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalorieCheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
