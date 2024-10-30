import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssAttMappingCodeComponent } from './view-ass-att-mapping-code.component';

describe('ViewAssAttMappingCodeComponent', () => {
  let component: ViewAssAttMappingCodeComponent;
  let fixture: ComponentFixture<ViewAssAttMappingCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssAttMappingCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssAttMappingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
