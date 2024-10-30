import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLovModuleComponent } from './view-lov-module.component';

describe('ViewLovModuleComponent', () => {
  let component: ViewLovModuleComponent;
  let fixture: ComponentFixture<ViewLovModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLovModuleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLovModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
