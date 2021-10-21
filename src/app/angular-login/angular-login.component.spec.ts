import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularLoginComponent } from './angular-login.component';

describe('AngularLoginComponent', () => {
  let component: AngularLoginComponent;
  let fixture: ComponentFixture<AngularLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
