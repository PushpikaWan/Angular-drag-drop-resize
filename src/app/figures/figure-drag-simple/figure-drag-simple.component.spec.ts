import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureDragSimpleComponent } from './figure-drag-simple.component';

describe('FigureDragSimpleComponent', () => {
  let component: FigureDragSimpleComponent;
  let fixture: ComponentFixture<FigureDragSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigureDragSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigureDragSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
