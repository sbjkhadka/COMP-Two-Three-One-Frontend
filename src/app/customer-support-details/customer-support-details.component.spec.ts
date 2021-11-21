import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportDetailsComponent } from './customer-support-details.component';

describe('CustomerSupportDetailsComponent', () => {
  let component: CustomerSupportDetailsComponent;
  let fixture: ComponentFixture<CustomerSupportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
