import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinanceParametersModuleComponent } from './view-finance-parameters-module.component';

describe('ViewFinanceParametersModuleComponent', () => {
  let component: ViewFinanceParametersModuleComponent;
  let fixture: ComponentFixture<ViewFinanceParametersModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFinanceParametersModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinanceParametersModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
