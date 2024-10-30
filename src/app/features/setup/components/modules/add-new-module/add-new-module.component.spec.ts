import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewModuleComponent } from './add-new-module.component';

describe('AddNewModuleComponent', () => {
  let component: AddNewModuleComponent;
  let fixture: ComponentFixture<AddNewModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
