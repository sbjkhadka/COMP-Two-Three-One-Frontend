import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFeedbackDetailsComponent } from './support-feedback-details.component';

describe('SupportFeedbackDetailsComponent', () => {
  let component: SupportFeedbackDetailsComponent;
  let fixture: ComponentFixture<SupportFeedbackDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportFeedbackDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFeedbackDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
