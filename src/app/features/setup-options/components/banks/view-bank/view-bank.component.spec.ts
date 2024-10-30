import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankComponent } from './view-bank.component';

describe('ViewBankComponent', () => {
  let component: ViewBankComponent;
  let fixture: ComponentFixture<ViewBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBankComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
