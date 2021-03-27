import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIngredientComponent } from './add-new-ingredient.component';

describe('AddNewIngredientComponent', () => {
  let component: AddNewIngredientComponent;
  let fixture: ComponentFixture<AddNewIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewIngredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
