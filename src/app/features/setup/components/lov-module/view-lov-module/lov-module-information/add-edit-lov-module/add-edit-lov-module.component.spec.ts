import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLovModuleComponent } from './add-edit-lov-module.component';

describe('AddEditLovModuleComponent', () => {
  let component: AddEditLovModuleComponent;
  let fixture: ComponentFixture<AddEditLovModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLovModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLovModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
