import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetAttComponent } from './view-asset-att.component';

describe('ViewAssetAttComponent', () => {
  let component: ViewAssetAttComponent;
  let fixture: ComponentFixture<ViewAssetAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssetAttComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
