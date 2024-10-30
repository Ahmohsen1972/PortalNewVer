import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssAttMappingCodeComponent } from './edit-ass-att-mapping-code.component';

describe('EditAssAttMappingCodeComponent', () => {
  let component: EditAssAttMappingCodeComponent;
  let fixture: ComponentFixture<EditAssAttMappingCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssAttMappingCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssAttMappingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
