import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLovsComponent } from './view-lovs.component';

describe('ViewLovsComponent', () => {
  let component: ViewLovsComponent;
  let fixture: ComponentFixture<ViewLovsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLovsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLovsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
