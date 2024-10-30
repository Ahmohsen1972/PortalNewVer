import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinanceProductInformationComponent } from './add-edit-finance-product-information.component';

describe('AddEditFinanceProductInformationComponent', () => {
  let component: AddEditFinanceProductInformationComponent;
  let fixture: ComponentFixture<AddEditFinanceProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFinanceProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AddEditFinanceProductInformationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
