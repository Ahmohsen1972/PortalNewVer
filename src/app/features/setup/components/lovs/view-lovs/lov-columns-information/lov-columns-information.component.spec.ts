import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovColumnsInformationComponent } from './lov-columns-information.component';

describe('LovColumnsInformationComponent', () => {
  let component: LovColumnsInformationComponent;
  let fixture: ComponentFixture<LovColumnsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LovColumnsInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovColumnsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
