import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainInformationComponent } from './domain-information.component';

describe('DomainInformationComponent', () => {
  let component: DomainInformationComponent;
  let fixture: ComponentFixture<DomainInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DomainInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
