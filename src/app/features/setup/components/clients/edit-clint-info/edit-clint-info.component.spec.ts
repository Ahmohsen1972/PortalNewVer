import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClintInfoComponent } from './edit-clint-info.component';

describe('EditClintInfoComponent', () => {
  let component: EditClintInfoComponent;
  let fixture: ComponentFixture<EditClintInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditClintInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClintInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
