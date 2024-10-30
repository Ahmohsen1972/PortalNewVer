import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexFieldSetupComponent } from './flex-field-setup.component';

describe('FlexFieldSetupComponent', () => {
  let component: FlexFieldSetupComponent;
  let fixture: ComponentFixture<FlexFieldSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlexFieldSetupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexFieldSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
