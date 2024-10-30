import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDefaultvaluesComponent } from './view-defaultvalues.component';

describe('ViewDefaultvaluesComponent', () => {
  let component: ViewDefaultvaluesComponent;
  let fixture: ComponentFixture<ViewDefaultvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDefaultvaluesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDefaultvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
