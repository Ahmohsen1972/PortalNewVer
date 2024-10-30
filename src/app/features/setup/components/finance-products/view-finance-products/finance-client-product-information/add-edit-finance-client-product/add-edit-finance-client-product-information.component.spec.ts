import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinanceClientProductInformationComponent } from './add-edit-finance-client-product-information.component';

describe('AddEditFinanceClientProductInformationComponent', () => {
  let component: AddEditFinanceClientProductInformationComponent;
  let fixture: ComponentFixture<AddEditFinanceClientProductInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFinanceClientProductInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AddEditFinanceClientProductInformationComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
