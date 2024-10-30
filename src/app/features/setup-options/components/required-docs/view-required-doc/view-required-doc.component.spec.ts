import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequiredDocComponent } from './view-required-doc.component';

describe('ViewRequiredDocComponent', () => {
  let component: ViewRequiredDocComponent;
  let fixture: ComponentFixture<ViewRequiredDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRequiredDocComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequiredDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
