import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfileInfoComponent } from './app-profile-info.component';

describe('AppProfileInfoComponent', () => {
  let component: AppProfileInfoComponent;
  let fixture: ComponentFixture<AppProfileInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppProfileInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
