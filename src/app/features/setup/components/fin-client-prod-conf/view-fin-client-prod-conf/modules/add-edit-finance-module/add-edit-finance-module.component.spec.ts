import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinanceModuleComponent } from './add-edit-finance-module.component';

describe('AddEditFinanceModuleComponent', () => {
  let component: AddEditFinanceModuleComponent;
  let fixture: ComponentFixture<AddEditFinanceModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFinanceModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFinanceModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
