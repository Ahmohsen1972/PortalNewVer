import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewModuleServicesComponent } from './view-module-services.component';

describe('ViewModuleServicesComponent', () => {
  let component: ViewModuleServicesComponent;
  let fixture: ComponentFixture<ViewModuleServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewModuleServicesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewModuleServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
