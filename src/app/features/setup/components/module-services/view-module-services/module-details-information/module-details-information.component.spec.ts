import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailsInformationComponent } from './module-details-information.component';

describe('ModuleDetailsInformationComponent', () => {
  let component: ModuleDetailsInformationComponent;
  let fixture: ComponentFixture<ModuleDetailsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleDetailsInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleDetailsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
