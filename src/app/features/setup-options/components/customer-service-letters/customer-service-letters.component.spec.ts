import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServiceLettersComponent } from './customer-service-letters.component';

describe('CustomerServiceLettersComponent', () => {
  let component: CustomerServiceLettersComponent;
  let fixture: ComponentFixture<CustomerServiceLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerServiceLettersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServiceLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
