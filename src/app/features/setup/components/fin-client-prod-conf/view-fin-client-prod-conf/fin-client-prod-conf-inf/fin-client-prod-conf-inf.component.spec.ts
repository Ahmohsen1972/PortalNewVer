import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinClientProdConfInfComponent } from './fin-client-prod-conf-inf.component';

describe('FinClientProdConfInfComponent', () => {
  let component: FinClientProdConfInfComponent;
  let fixture: ComponentFixture<FinClientProdConfInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinClientProdConfInfComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinClientProdConfInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
