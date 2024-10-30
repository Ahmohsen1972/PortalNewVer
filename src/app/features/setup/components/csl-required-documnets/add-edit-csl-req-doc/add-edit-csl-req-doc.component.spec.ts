import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCslReqDocComponent } from './add-edit-csl-req-doc.component';

describe('AddEditCslReqDocComponent', () => {
  let component: AddEditCslReqDocComponent;
  let fixture: ComponentFixture<AddEditCslReqDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCslReqDocComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCslReqDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
