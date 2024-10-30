import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDomainInfoComponent } from './add-edit-domain-info.component';

describe('AddEditDomainInfoComponent', () => {
  let component: AddEditDomainInfoComponent;
  let fixture: ComponentFixture<AddEditDomainInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDomainInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDomainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
