import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMockupComponent } from './device-mockup.component';

describe('DeviceMockupComponent', () => {
  let component: DeviceMockupComponent;
  let fixture: ComponentFixture<DeviceMockupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMockupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMockupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
