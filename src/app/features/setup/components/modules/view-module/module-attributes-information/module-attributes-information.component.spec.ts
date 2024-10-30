import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAttributesInformationComponent } from './module-attributes-information.component';

describe('ModuleAttributesInformationComponent', () => {
  let component: ModuleAttributesInformationComponent;
  let fixture: ComponentFixture<ModuleAttributesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleAttributesInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleAttributesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
