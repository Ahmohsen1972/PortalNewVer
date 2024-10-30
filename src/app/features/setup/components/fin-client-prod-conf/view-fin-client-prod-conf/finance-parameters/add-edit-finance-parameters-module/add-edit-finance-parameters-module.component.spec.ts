import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinanceParametersModuleComponent } from './add-edit-finance-parameters-module.component';

describe('AddEditFinanceParametersModuleComponent', () => {
  let component: AddEditFinanceParametersModuleComponent;
  let fixture: ComponentFixture<AddEditFinanceParametersModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFinanceParametersModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFinanceParametersModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
