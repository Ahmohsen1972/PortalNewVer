import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLocalizeComponent } from './action-localize.component';

describe('ActionLocalizeComponent', () => {
  let component: ActionLocalizeComponent;
  let fixture: ComponentFixture<ActionLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
