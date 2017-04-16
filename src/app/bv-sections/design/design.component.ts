import {Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import { ColorPickerService, Rgba } from 'angular2-color-picker';
import { DragulaService } from 'ng2-dragula';
import { DeviceService } from '../device-mockup/device.service';
import {IDeviceModel, IDeviceTab, TabID} from '../device-mockup/i-device-model';
import {CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  templateUrl: 'design.component.html',
  styleUrls: ['design.component.css'],
})
export class DesignComponent implements OnInit, OnDestroy, AfterViewInit {


    public selectedColor = 'primary';

    public colorTabID = TabID.COLOR;

    public currentID = this.colorTabID;

    public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

    public deviceModel: IDeviceModel;

    @ViewChild('cropper', undefined)
    private cropper: ImageCropperComponent;

    private cropperSettings: CropperSettings;

    private headerCropperSettings: CropperSettings;

    private data: any;

    private showHints = true;

    constructor(
      private cpService: ColorPickerService,
      private _dragulaService: DragulaService,
      private _deviceService: DeviceService ) {

      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 600;
      this.cropperSettings.height = 512;
      this.cropperSettings.croppedWidth = 100;
      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.canvasWidth = 100;
      this.cropperSettings.canvasHeight = 100;

      this.headerCropperSettings = new CropperSettings();
      this.headerCropperSettings.width = 612;
      this.headerCropperSettings.height = 88;
      this.headerCropperSettings.minWidth = 570;
      this.headerCropperSettings.minHeight = 88;
      this.headerCropperSettings.croppedWidth = 570;
      this.headerCropperSettings.croppedHeight = 88;

      this.headerCropperSettings.canvasWidth = 612;
      this.headerCropperSettings.canvasHeight = 512;

      this.data = {};
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
      copy: false,
      moves: function (el, source, handle, sibling) {
        return true;
      },
      accepts: function (el, target, source, sibling) {
        return true;
      },
      direction: 'horizontal',             // Y axis is considered when determining where an element would be dropped
      copySortSource: false,             // elements in copy-source containers can be reordered
      revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
      removeOnSpill: false,              // spilling will `.remove` the element, if this is true
      mirrorContainer: document.body,    // set the element that gets mirror elements appended
      ignoreInputTextSelection: true     // allows users to select input text, see details below
    });

    this._dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });

    this._deviceService.getModel().subscribe(
      model => this.deviceModel = model

    );
  }

  ngOnDestroy() {
    this._dragulaService.destroy('drag-bag');
  }


  onDrop(args) {
    const [el, target, source, sibling] = args;


    const start = el.id;

    let end;

    if (sibling == null) {
      end = null;
    }
    else {
      end = sibling.id;
    }

    this._deviceService.moveTab(start, end);


  }

  ngAfterViewInit(): void {
    // Cropper requires an actual img object if we want to preload an image

    const img = document.createElement('img');
    this.cropper.setImage(img);

  }

  onCrop(event: any, tab: IDeviceTab): void {
    this._deviceService.setImage(tab.id, this.data.image);
  }

  onCropHeader(event: any, tab: IDeviceTab): void {
    this._deviceService.setHeaderImage(tab.id, this.data.image);

  }
}
