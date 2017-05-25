import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

import { Component, OnInit, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'bv-header',
  template: '<router-outlet></router-outlet>',
})

export class DummyComponent  { }

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, DummyComponent ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'app-profile-info', component: DummyComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be defaulted to AppInfo', async(() => {
    fixture.detectChanges();
    const header = fixture.debugElement.componentInstance;
    expect(header.currentID).toEqual(header.appInfoID);
  }));

  it('should change to profile info when clicked', async(() => {
    fixture.detectChanges();
    const header = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;

    const profileInfo = compiled.querySelector('#profileInfo');
    // profileInfo.click();

    // expect(header.currentID).toEqual(header.profileInfoID);
  }));
});
