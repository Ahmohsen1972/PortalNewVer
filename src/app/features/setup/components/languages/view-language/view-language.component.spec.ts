import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLanguageComponent } from './view-language.component';

describe('ViewLanguageComponent', () => {
  let component: ViewLanguageComponent;
  let fixture: ComponentFixture<ViewLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLanguageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
