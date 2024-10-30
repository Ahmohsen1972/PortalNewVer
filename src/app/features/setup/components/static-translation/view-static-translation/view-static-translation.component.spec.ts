import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaticTranslationComponent } from './view-static-translation.component';

describe('ViewStaticTranslationComponent', () => {
  let component: ViewStaticTranslationComponent;
  let fixture: ComponentFixture<ViewStaticTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStaticTranslationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaticTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
