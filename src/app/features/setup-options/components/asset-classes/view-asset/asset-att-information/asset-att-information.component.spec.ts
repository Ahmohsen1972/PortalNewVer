import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAttInformationComponent } from './asset-att-information.component';

describe('AssetAttInformationComponent', () => {
  let component: AssetAttInformationComponent;
  let fixture: ComponentFixture<AssetAttInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetAttInformationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAttInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
