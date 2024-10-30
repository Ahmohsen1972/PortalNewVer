import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditModuleServicesInfoComponent } from './add-edit-module-services-info.component';

describe('AddEditModuleServicesInfoComponent', () => {
  let component: AddEditModuleServicesInfoComponent;
  let fixture: ComponentFixture<AddEditModuleServicesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditModuleServicesInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditModuleServicesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
