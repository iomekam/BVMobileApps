import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import {SuiCollapseModule} from 'ng2-semantic-ui';

import { ColorPickerService, Rgba } from 'angular2-color-picker';
import {AppInfoService} from "../app-info/app-info.service";
import {DesignService} from "./design.service";

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}


@Component({
  selector: 'bv-app-info',
  templateUrl: 'design.component.html',
  styleUrls: ['design.component.css'],
})
export class DesignComponent {

    public arrayColors: any = {};

    public selectedColor: string = 'color';

    private colorTab: boolean = true;
    private musicTab: boolean = true;
    private videoTab: boolean = true;
    private photoTab: boolean = true;
    private optionalTab: boolean = true;
    private optionalTab2: boolean = true;


    public color: string = "#13afeb";
    public color2: string = "#13afeb";

    private test = false;
    private colorTabID: number = 1
    private musicTabID: number = 2
    private videoTabID: number = 3
    private photoTabID: number = 4
    private optionalTabID: number = 5
    private optionalTab2ID: number = 6

    private currentID: number = -1;

    constructor(private cpService: ColorPickerService,  private _appInfoService: DesignService) {
      this.arrayColors['color'] = '#2883e9';
      this.arrayColors['color2'] = '#e920e9';
    }


    public toggleCollapse(location)
    {
      console.log(location);
      console.log(this.currentID);
      if(location == this.currentID)
      {
        if(location == this.colorTabID)
        {
          this.colorTab = !this.colorTab;
        }
        else if(location == this.musicTabID)
        {
          this.musicTab = !this.musicTab;
        }
        else if(location == this.videoTabID)
        {
          this.videoTab = !this.videoTab;
        }
        else if(location == this.photoTabID)
        {
          this.photoTab = !this.photoTab;
        }
        else if(location == this.optionalTabID)
        {
          this.optionalTab = !this.optionalTab;
        }
        else if(location == this.optionalTab2ID)
        {
          this.optionalTab2 = !this.optionalTab2;
        }
      }
      else
      {
        this.clearTabs();
        if(location == this.colorTabID)
        {
          this.colorTab = false;
          this.currentID = location;
        }
        else if(location == this.musicTabID)
        {
          this.musicTab = false;
          this.currentID = location;

        }
        else if(location == this.videoTabID)
        {
          this.videoTab = false;
          this.currentID = location;
        }
        else if(location == this.photoTabID)
        {
          this.photoTab = false;
          this.currentID = location;
        }
        else if(location == this.optionalTabID)
        {
          this.optionalTab = false;
          this.currentID = location;
        }
        else if(location == this.optionalTab2ID)
        {
          this.optionalTab2 = false;
          this.currentID = location;
        }
      }

    }

    clearTabs()
    {
      this.colorTab = true;
      this.musicTab = true;
      this.videoTab = true;
      this.photoTab = true;
      this.optionalTab = true;
      this.optionalTab2 = true;
    }

  public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

  onChangeColor(color: string) {
    console.log('test');

    console.log(color);
    this._appInfoService.setAppInfo(color);
    this._appInfoService.appNameUpdated();

  }

  rgbaToCmyk(rgba: Rgba): Cmyk {
    let cmyk: Cmyk = new Cmyk(0, 0, 0, 0), k: number;
    k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k == 1) return new Cmyk(0, 0, 0, 1);
    cmyk.c = (1 - rgba.r - k) / (1 - k);
    cmyk.m = (1 - rgba.g - k) / (1 - k);
    cmyk.y = (1 - rgba.b - k) / (1 - k);
    cmyk.k = k;
    return cmyk;
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', true);
  }

}
