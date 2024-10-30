import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovModuleComponent } from './lov-module.component';

describe('LovModuleComponent', () => {
  let component: LovModuleComponent;
  let fixture: ComponentFixture<LovModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LovModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
