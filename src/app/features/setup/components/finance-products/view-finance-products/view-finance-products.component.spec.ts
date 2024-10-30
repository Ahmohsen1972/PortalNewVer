import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinanceProductsComponent } from './view-finance-products.component';

describe('ViewFinanceProductsComponent', () => {
  let component: ViewFinanceProductsComponent;
  let fixture: ComponentFixture<ViewFinanceProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFinanceProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinanceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
