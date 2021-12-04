import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFeedbackComponent } from './support-feedback.component';

describe('SupportFeedbackComponent', () => {
  let component: SupportFeedbackComponent;
  let fixture: ComponentFixture<SupportFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
