import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerServiceLetterComponent } from './view-customer-service-letter.component';

describe('ViewCustomerServiceLetterComponent', () => {
  let component: ViewCustomerServiceLetterComponent;
  let fixture: ComponentFixture<ViewCustomerServiceLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCustomerServiceLetterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerServiceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
