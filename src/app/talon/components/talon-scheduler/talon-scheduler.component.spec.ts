import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonSchedulerComponent } from './talon-scheduler.component';

describe('TalonSchedulerComponent', () => {
  let component: TalonSchedulerComponent;
  let fixture: ComponentFixture<TalonSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalonSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalonSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
