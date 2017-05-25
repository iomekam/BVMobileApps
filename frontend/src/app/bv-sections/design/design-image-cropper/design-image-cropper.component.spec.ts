import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignImageCropperComponent } from './design-image-cropper.component';

describe('DesignImageCropperComponent', () => {
  let component: DesignImageCropperComponent;
  let fixture: ComponentFixture<DesignImageCropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignImageCropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignImageCropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
