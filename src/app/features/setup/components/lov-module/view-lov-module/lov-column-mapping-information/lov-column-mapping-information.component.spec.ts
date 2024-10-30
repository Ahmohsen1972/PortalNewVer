import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovColumnMappingInformationComponent } from './lov-column-mapping-information.component';

describe('LovColumnMappingInformationComponent', () => {
  let component: LovColumnMappingInformationComponent;
  let fixture: ComponentFixture<LovColumnMappingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LovColumnMappingInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovColumnMappingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
