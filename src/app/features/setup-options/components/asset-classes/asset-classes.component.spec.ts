import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetClassesComponent } from './asset-classes.component';

describe('AssetClassesComponent', () => {
  let component: AssetClassesComponent;
  let fixture: ComponentFixture<AssetClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetClassesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
