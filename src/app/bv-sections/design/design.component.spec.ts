import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignComponent } from './design.component';
import {PopoverModule} from "ngx-popover";
import {DragulaModule} from "ng2-dragula";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ImageCropperModule} from "../../ng2-img-cropper/src/imageCropperModule";
import {SuiModule} from "ng2-semantic-ui";
import {ColorPickerModule} from "angular2-color-picker";
import {DeviceService} from "../device-mockup/device.service";
import {browser, by, element} from "protractor";

describe('DesignComponent', () => {
  let component: DesignComponent;
  let fixture: ComponentFixture<DesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignComponent ],
      imports: [
        PopoverModule,
        FormsModule,
        ReactiveFormsModule,
        DragulaModule,
        ImageCropperModule,
        SuiModule,
        ColorPickerModule,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
      providers: [DeviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should show color by default', () => {
    //expect(component).toBeTruthy();
    browser.get('/design');

  });

  it('should expand when item clicked', () => {
  });

});

