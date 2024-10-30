import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCodesInformationComponent } from './view-codes-information.component';

describe('ViewCodesInformationComponent', () => {
  let component: ViewCodesInformationComponent;
  let fixture: ComponentFixture<ViewCodesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCodesInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCodesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
