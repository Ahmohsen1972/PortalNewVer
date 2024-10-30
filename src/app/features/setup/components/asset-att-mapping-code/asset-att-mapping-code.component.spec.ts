import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAttMappingCodeComponent } from './asset-att-mapping-code.component';

describe('AssetAttMappingCodeComponent', () => {
  let component: AssetAttMappingCodeComponent;
  let fixture: ComponentFixture<AssetAttMappingCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetAttMappingCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAttMappingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
