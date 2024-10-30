import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceProductInformationComponent } from './finance-product-information.component';

describe('FinanceProductInformationComponent', () => {
  let component: FinanceProductInformationComponent;
  let fixture: ComponentFixture<FinanceProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
