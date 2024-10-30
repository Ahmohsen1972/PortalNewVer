import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLovComponent } from './add-new-lov.component';

describe('AddNewLovComponent', () => {
  let component: AddNewLovComponent;
  let fixture: ComponentFixture<AddNewLovComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewLovComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
