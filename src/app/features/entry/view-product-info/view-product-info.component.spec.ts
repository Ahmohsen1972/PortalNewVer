import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductInfoComponent } from './view-product-info.component';

describe('ViewProductInfoComponent', () => {
  let component: ViewProductInfoComponent;
  let fixture: ComponentFixture<ViewProductInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProductInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
