import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinanceModuleComponent } from './view-finance-module.component';

describe('ViewFinanceModuleComponent', () => {
  let component: ViewFinanceModuleComponent;
  let fixture: ComponentFixture<ViewFinanceModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFinanceModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinanceModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
