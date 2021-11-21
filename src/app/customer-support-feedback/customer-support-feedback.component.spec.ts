import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportFeedbackComponent } from './customer-support-feedback.component';

describe('CustomerSupportFeedbackComponent', () => {
  let component: CustomerSupportFeedbackComponent;
  let fixture: ComponentFixture<CustomerSupportFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
