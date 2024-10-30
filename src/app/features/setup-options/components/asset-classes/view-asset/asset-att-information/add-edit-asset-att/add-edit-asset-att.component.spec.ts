import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssetAttComponent } from './add-edit-asset-att.component';

describe('AddEditAssetAttComponent', () => {
  let component: AddEditAssetAttComponent;
  let fixture: ComponentFixture<AddEditAssetAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAssetAttComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAssetAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
