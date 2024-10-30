import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserRolesComponent } from './add-edit-user-roles.component';

describe('AddEditUserRolesComponent', () => {
  let component: AddEditUserRolesComponent;
  let fixture: ComponentFixture<AddEditUserRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditUserRolesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
