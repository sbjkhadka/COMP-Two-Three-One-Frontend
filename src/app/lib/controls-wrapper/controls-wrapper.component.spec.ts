import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsWrapperComponent } from './controls-wrapper.component';

describe('ControlsWrapperComponent', () => {
  let component: ControlsWrapperComponent;
  let fixture: ComponentFixture<ControlsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
