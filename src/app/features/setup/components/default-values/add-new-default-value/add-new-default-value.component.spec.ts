import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDefaultValueComponent } from './add-new-default-value.component';

describe('AddNewDefaultValueComponent', () => {
  let component: AddNewDefaultValueComponent;
  let fixture: ComponentFixture<AddNewDefaultValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewDefaultValueComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDefaultValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
