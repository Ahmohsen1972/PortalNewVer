import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailsInformationComponent } from './view-details-information.component';

describe('ViewDetailsInformationComponent', () => {
  let component: ViewDetailsInformationComponent;
  let fixture: ComponentFixture<ViewDetailsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailsInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
