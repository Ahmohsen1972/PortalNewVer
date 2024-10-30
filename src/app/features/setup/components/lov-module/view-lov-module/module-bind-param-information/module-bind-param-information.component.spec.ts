import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBindParamInformationComponent } from './module-bind-param-information.component';

describe('ModuleBindParamInformationComponent', () => {
  let component: ModuleBindParamInformationComponent;
  let fixture: ComponentFixture<ModuleBindParamInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleBindParamInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleBindParamInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
