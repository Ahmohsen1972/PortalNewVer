import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBanksComponent } from './add-new-banks.component';

describe('AddNewBanksComponent', () => {
  let component: AddNewBanksComponent;
  let fixture: ComponentFixture<AddNewBanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewBanksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
