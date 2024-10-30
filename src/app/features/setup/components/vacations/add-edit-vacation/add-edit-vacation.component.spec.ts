import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditVacationComponent } from './add-edit-vacation.component';

describe('AddEditVacationComponent', () => {
  let component: AddEditVacationComponent;
  let fixture: ComponentFixture<AddEditVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditVacationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
