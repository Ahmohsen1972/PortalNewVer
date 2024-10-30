import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLovModuleParamComponent } from './add-edit-lov-module-param.component';

describe('AddEditLovModuleParamComponent', () => {
  let component: AddEditLovModuleParamComponent;
  let fixture: ComponentFixture<AddEditLovModuleParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLovModuleParamComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLovModuleParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
