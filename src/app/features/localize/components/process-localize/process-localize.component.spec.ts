import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLocalizeComponent } from './process-localize.component';

describe('ProcessLocalizeComponent', () => {
  let component: ProcessLocalizeComponent;
  let fixture: ComponentFixture<ProcessLocalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessLocalizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLocalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
