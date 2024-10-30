import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFlexFieldSetupComponent } from './edit-flex-field-setup.component';

describe('EditFlexFieldSetupComponent', () => {
  let component: EditFlexFieldSetupComponent;
  let fixture: ComponentFixture<EditFlexFieldSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFlexFieldSetupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFlexFieldSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
