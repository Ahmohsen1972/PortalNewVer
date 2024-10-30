import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewModuleServicesComponent } from './add-new-module-services.component';

describe('AddNewModuleServicesComponent', () => {
  let component: AddNewModuleServicesComponent;
  let fixture: ComponentFixture<AddNewModuleServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewModuleServicesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewModuleServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
