import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRecipeComponent } from './add-new-recipe.component';

describe('AddNewRecipeComponent', () => {
  let component: AddNewRecipeComponent;
  let fixture: ComponentFixture<AddNewRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
