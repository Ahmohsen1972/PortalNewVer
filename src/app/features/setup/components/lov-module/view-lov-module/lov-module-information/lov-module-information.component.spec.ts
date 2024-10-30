import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovModuleInformationComponent } from './lov-module-information.component';

describe('LovModuleInformationComponent', () => {
  let component: LovModuleInformationComponent;
  let fixture: ComponentFixture<LovModuleInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LovModuleInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovModuleInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
