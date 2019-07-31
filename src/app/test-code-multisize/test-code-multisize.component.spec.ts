import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCodeMultisizeComponent } from './test-code-multisize.component';

describe('TestCodeMultisizeComponent', () => {
  let component: TestCodeMultisizeComponent;
  let fixture: ComponentFixture<TestCodeMultisizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCodeMultisizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCodeMultisizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
