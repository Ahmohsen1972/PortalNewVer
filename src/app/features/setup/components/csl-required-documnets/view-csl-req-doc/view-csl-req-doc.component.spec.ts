import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCslReqDocComponent } from './view-csl-req-doc.component';

describe('ViewCslReqDocComponent', () => {
  let component: ViewCslReqDocComponent;
  let fixture: ComponentFixture<ViewCslReqDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCslReqDocComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCslReqDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
