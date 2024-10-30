import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFinClientProdConfComponent } from './view-fin-client-prod-conf.component';

describe('ViewFinClientProdConfComponent', () => {
  let component: ViewFinClientProdConfComponent;
  let fixture: ComponentFixture<ViewFinClientProdConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFinClientProdConfComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFinClientProdConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
