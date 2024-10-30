import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinanceClientProductInformationComponent } from './view-finance-client-product-information.component';

describe('ViewFinanceClientProductInformationComponent', () => {
  let component: ViewFinanceClientProductInformationComponent;
  let fixture: ComponentFixture<ViewFinanceClientProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFinanceClientProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ViewFinanceClientProductInformationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
