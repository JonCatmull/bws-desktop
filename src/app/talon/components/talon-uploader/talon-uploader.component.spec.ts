import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalonUploaderComponent } from './talon-uploader.component';

describe('TalonUploaderComponent', () => {
  let component: TalonUploaderComponent;
  let fixture: ComponentFixture<TalonUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalonUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalonUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
