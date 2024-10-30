import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovsInformationComponent } from './lovs-information.component';

describe('LovsInformationComponent', () => {
  let component: LovsInformationComponent;
  let fixture: ComponentFixture<LovsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LovsInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
