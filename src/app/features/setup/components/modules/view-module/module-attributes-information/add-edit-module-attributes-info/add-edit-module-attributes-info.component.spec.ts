import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditModuleAttributesInfoComponent } from './add-edit-module-attributes-info.component';

describe('AddEditModuleAttributesInfoComponent', () => {
  let component: AddEditModuleAttributesInfoComponent;
  let fixture: ComponentFixture<AddEditModuleAttributesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditModuleAttributesInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditModuleAttributesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
