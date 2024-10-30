import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStaticTranslationComponent } from './add-new-static-translation.component';

describe('AddNewStaticTranslationComponent', () => {
  let component: AddNewStaticTranslationComponent;
  let fixture: ComponentFixture<AddNewStaticTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewStaticTranslationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewStaticTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
