import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLovsComponent } from './edit-lovs.component';

describe('EditLovsComponent', () => {
  let component: EditLovsComponent;
  let fixture: ComponentFixture<EditLovsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditLovsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLovsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
