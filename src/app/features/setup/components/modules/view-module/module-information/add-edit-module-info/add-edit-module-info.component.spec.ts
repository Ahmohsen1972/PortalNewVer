import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditModuleInfoComponent } from './add-edit-module-info.component';

describe('AddEditModuleInfoComponent', () => {
  let component: AddEditModuleInfoComponent;
  let fixture: ComponentFixture<AddEditModuleInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditModuleInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditModuleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
