import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinClientProdConfComponent } from './add-edit-fin-client-prod-conf.component';

describe('AddEditFinClientProdConfComponent', () => {
  let component: AddEditFinClientProdConfComponent;
  let fixture: ComponentFixture<AddEditFinClientProdConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFinClientProdConfComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditFinClientProdConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
