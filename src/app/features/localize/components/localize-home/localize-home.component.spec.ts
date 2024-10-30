import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizeHomeComponent } from './localize-home.component';

describe('LocalizeHomeComponent', () => {
  let component: LocalizeHomeComponent;
  let fixture: ComponentFixture<LocalizeHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizeHomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
