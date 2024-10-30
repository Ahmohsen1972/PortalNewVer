import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLocalizeComponent } from './module-localize.component';

describe('ModuleLocalizeComponent', () => {
  let component: ModuleLocalizeComponent;
  let fixture: ComponentFixture<ModuleLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
