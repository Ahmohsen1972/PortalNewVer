import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticTranslationComponent } from './static-translation.component';

describe('StaticTranslationComponent', () => {
  let component: StaticTranslationComponent;
  let fixture: ComponentFixture<StaticTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaticTranslationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
