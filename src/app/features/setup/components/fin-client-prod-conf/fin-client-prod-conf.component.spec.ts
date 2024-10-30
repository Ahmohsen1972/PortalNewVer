import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinClientProdConfComponent } from './fin-client-prod-conf.component';

describe('FinClientProdConfComponent', () => {
  let component: FinClientProdConfComponent;
  let fixture: ComponentFixture<FinClientProdConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinClientProdConfComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinClientProdConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
