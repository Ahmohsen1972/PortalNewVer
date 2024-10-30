import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleLocalizeComponent } from './edit-module-localize.component';

describe('EditModuleLocalizeComponent', () => {
  let component: EditModuleLocalizeComponent;
  let fixture: ComponentFixture<EditModuleLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditModuleLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
