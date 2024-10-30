import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttributeDetailsComponent } from './edit-attribute-details.component';

describe('EditAttributeDetailsComponent', () => {
  let component: EditAttributeDetailsComponent;
  let fixture: ComponentFixture<EditAttributeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAttributeDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAttributeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
