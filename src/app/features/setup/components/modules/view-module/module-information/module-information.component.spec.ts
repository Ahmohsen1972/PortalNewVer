import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleInformationComponent } from './module-information.component';

describe('ModuleInformationComponent', () => {
  let component: ModuleInformationComponent;
  let fixture: ComponentFixture<ModuleInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
