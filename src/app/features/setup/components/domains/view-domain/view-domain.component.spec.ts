import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDomainComponent } from './view-domain.component';

describe('ViewDomainComponent', () => {
  let component: ViewDomainComponent;
  let fixture: ComponentFixture<ViewDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDomainComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
