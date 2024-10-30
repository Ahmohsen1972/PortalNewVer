import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequiredDocumentComponent } from './view-required-document.component';

describe('ViewRequiredDocumentComponent', () => {
  let component: ViewRequiredDocumentComponent;
  let fixture: ComponentFixture<ViewRequiredDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRequiredDocumentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRequiredDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
