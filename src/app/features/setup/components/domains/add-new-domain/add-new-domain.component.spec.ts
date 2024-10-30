import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDomainComponent } from './add-new-domain.component';

describe('AddNewDomainComponent', () => {
  let component: AddNewDomainComponent;
  let fixture: ComponentFixture<AddNewDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewDomainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
