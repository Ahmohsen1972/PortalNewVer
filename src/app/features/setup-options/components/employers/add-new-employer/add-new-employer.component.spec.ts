import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEmployerComponent } from './add-new-employer.component';

describe('AddNewEmployerComponent', () => {
  let component: AddNewEmployerComponent;
  let fixture: ComponentFixture<AddNewEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewEmployerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
