import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeHelpDetailsComponent } from './attribute-help-details.component';

describe('AttributeHelpDetailsComponent', () => {
  let component: AttributeHelpDetailsComponent;
  let fixture: ComponentFixture<AttributeHelpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttributeHelpDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeHelpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
