import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CslRequiredDocumnetsComponent } from './csl-required-documnets.component';

describe('CslRequiredDocumnetsComponent', () => {
  let component: CslRequiredDocumnetsComponent;
  let fixture: ComponentFixture<CslRequiredDocumnetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CslRequiredDocumnetsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CslRequiredDocumnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
