import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonPageComponent } from './talon-page.component';

describe('TalonPageComponent', () => {
  let component: TalonPageComponent;
  let fixture: ComponentFixture<TalonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
