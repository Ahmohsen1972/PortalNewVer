import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCustomerServiceLetterComponent } from './add-new-customer-service-letter.component';

describe('AddNewCustomerServiceLetterComponent', () => {
  let component: AddNewCustomerServiceLetterComponent;
  let fixture: ComponentFixture<AddNewCustomerServiceLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewCustomerServiceLetterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCustomerServiceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
