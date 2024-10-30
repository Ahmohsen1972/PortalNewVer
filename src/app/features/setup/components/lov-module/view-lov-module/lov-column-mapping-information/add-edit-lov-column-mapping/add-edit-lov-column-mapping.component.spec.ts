import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLovColumnMappingComponent } from './add-edit-lov-column-mapping.component';

describe('AddEditLovColumnMappingComponent', () => {
  let component: AddEditLovColumnMappingComponent;
  let fixture: ComponentFixture<AddEditLovColumnMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLovColumnMappingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLovColumnMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
