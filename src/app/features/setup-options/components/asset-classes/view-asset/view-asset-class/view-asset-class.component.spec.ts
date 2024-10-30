import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssetClassComponent } from './view-asset-class.component';

describe('ViewAssetClassComponent', () => {
  let component: ViewAssetClassComponent;
  let fixture: ComponentFixture<ViewAssetClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssetClassComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssetClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
