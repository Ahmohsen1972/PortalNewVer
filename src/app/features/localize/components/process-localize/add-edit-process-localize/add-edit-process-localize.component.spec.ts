import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProcessLocalizeComponent } from './add-edit-process-localize.component';

describe('AddEditProcessLocalizeComponent', () => {
  let component: AddEditProcessLocalizeComponent;
  let fixture: ComponentFixture<AddEditProcessLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProcessLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProcessLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
