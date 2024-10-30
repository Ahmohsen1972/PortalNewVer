import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditActionLocalizeComponent } from './add-edit-action-localize.component';

describe('AddEditActionLocalizeComponent', () => {
  let component: AddEditActionLocalizeComponent;
  let fixture: ComponentFixture<AddEditActionLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditActionLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditActionLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
