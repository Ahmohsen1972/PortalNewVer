import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCodeComponent } from './add-edit-code.component';

describe('AddEditCodeComponent', () => {
  let component: AddEditCodeComponent;
  let fixture: ComponentFixture<AddEditCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
