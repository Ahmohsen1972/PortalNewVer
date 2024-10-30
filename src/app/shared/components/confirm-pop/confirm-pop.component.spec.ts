import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopComponent } from './confirm-pop.component';

describe('ConfirmPopComponent', () => {
  let component: ConfirmPopComponent;
  let fixture: ComponentFixture<ConfirmPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
