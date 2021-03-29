import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMyGroceryComponent } from './print-my-grocery.component';

describe('PrintMyGroceryComponent', () => {
  let component: PrintMyGroceryComponent;
  let fixture: ComponentFixture<PrintMyGroceryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMyGroceryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMyGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
