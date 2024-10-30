import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleServicesComponent } from './module-services.component';

describe('ModuleServicesComponent', () => {
  let component: ModuleServicesComponent;
  let fixture: ComponentFixture<ModuleServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleServicesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
