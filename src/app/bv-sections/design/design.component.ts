import { Component, OnInit, OnDestroy } from '@angular/core';
import { ColorPickerService, Rgba } from 'angular2-color-picker';
import { DragulaService } from 'ng2-dragula';
import { DeviceService } from '../device-mockup/device.service';
import { IDeviceModel, TabID } from '../device-mockup/i-device-model';

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  templateUrl: 'design.component.html',
  styleUrls: ['design.component.css'],
})
export class DesignComponent implements OnInit, OnDestroy {

    public selectedColor = 'primary';

    public colorTabID = TabID.COLOR;

    public currentID = this.colorTabID;

    public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

    public deviceModel: IDeviceModel;

    constructor(
      private cpService: ColorPickerService,
      private _dragulaService: DragulaService,
      private _deviceService: DeviceService) {
    }


    public toggleCollapse(location: TabID) {
      if (location === this.currentID) {
        this.currentID = -1;
      }
      else {
        this.currentID = location;
      }
    }

  onChangeColor(color: string) {

  }

  rgbaToCmyk(rgba: Rgba): Cmyk {
    const cmyk: Cmyk = new Cmyk(0, 0, 0, 0);
    const k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k === 1) { return new Cmyk(0, 0, 0, 1); }
    cmyk.c = (1 - rgba.r - k) / (1 - k);
    cmyk.m = (1 - rgba.g - k) / (1 - k);
    cmyk.y = (1 - rgba.b - k) / (1 - k);
    cmyk.k = k;
    return cmyk;
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', true);
  }

  ngOnInit() {
    this._dragulaService.setOptions('drag-bag', {
      copy: true
    });

    this.deviceModel = this._deviceService.getModel();
  }

  ngOnDestroy() {
    this._dragulaService.destroy('drag-bag');
  }
}
