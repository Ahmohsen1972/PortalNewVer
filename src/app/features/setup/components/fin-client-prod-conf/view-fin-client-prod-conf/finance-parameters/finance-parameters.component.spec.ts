import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceParametersComponent } from './finance-parameters.component';

describe('FinanceParametersComponent', () => {
  let component: FinanceParametersComponent;
  let fixture: ComponentFixture<FinanceParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinanceParametersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
