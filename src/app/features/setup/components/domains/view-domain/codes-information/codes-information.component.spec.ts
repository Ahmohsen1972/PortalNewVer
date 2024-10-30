import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesInformationComponent } from './codes-information.component';

describe('CodesInformationComponent', () => {
  let component: CodesInformationComponent;
  let fixture: ComponentFixture<CodesInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodesInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodesInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
