import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFinanceProductComponent } from './add-new-finance-product.component';

describe('AddNewFinanceProductComponent', () => {
  let component: AddNewFinanceProductComponent;
  let fixture: ComponentFixture<AddNewFinanceProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewFinanceProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFinanceProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
