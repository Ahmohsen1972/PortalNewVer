import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleServicesInformationComponent } from './module-services-information.component';

describe('ModuleServicesInformationComponent', () => {
  let component: ModuleServicesInformationComponent;
  let fixture: ComponentFixture<ModuleServicesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleServicesInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleServicesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
