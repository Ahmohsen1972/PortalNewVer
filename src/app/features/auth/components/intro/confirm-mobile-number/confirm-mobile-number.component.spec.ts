import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmMobileNumberComponent } from './confirm-mobile-number.component';

describe('ConfirmMobileNumberComponent', () => {
  let component: ConfirmMobileNumberComponent;
  let fixture: ComponentFixture<ConfirmMobileNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmMobileNumberComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
