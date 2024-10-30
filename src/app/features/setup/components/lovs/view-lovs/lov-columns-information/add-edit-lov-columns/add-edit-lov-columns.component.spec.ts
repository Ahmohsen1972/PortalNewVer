import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLovColumnsComponent } from './add-edit-lov-columns.component';

describe('AddEditLovColumnsComponent', () => {
  let component: AddEditLovColumnsComponent;
  let fixture: ComponentFixture<AddEditLovColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLovColumnsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLovColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
