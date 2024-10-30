import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocsComponent } from './required-docs.component';

describe('RequiredDocsComponent', () => {
  let component: RequiredDocsComponent;
  let fixture: ComponentFixture<RequiredDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequiredDocsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
