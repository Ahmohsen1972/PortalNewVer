import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceClientProductInformationComponent } from './finance-client-product-information.component';

describe('FinanceClientProductInformationComponent', () => {
  let component: FinanceClientProductInformationComponent;
  let fixture: ComponentFixture<FinanceClientProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceClientProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceClientProductInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
