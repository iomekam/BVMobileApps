import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, AfterViewInit, QueryList, Input } from '@angular/core';
import { ColorPickerService, Rgba } from 'angular2-color-picker';
import { DragulaService } from 'ng2-dragula';
import { DeviceService } from '../device-mockup/device.service';
import { IDeviceModel, IDeviceTab, TabID } from '../device-mockup/i-device-model';
import { CropperSettings, ImageCropperComponent, Bounds } from '../../ng2-img-cropper';
import { BvImage } from '../shared/bv-image';
import { DesignImageCropperComponent } from './design-image-cropper/design-image-cropper.component';
import { MdSnackBar } from '@angular/material';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../../bv-sections/shared/validation.service';

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

    @ViewChildren('designImgCropperIcon')
    private imgCropperIcon: QueryList<DesignImageCropperComponent>;

    @ViewChildren('designImgCropper')
    private imgCropper: QueryList<DesignImageCropperComponent>;

    private cropperSettings: CropperSettings;

    private headerCropperSettings: CropperSettings;
    private headerVIDMUSPHOTCropperSettings: CropperSettings;
    private headerRADIOCropperSettings: CropperSettings;

    private extraHeaderCropperSettings: CropperSettings;

    public isSubmitEnabled: boolean = false;

    public mainEnum : TabID = TabID.BLOG;
    public videoEnum : TabID = TabID.VIDEO;
    public musicEnum : TabID = TabID.MUSIC;
    public photoEnum : TabID = TabID.PHOTO;
    public radioEnum : TabID = TabID.RADIO;
    public moreEnum : TabID = TabID.MORE;


    constructor(
      private cpService: ColorPickerService,
      private _dragulaService: DragulaService,
      private _deviceService: DeviceService,
      private _headerService: HeaderService,
      private _validationService: ValidationService,
      private snackBar: MdSnackBar) {

      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 600;
      this.cropperSettings.height = 512;
      this.cropperSettings.croppedWidth = 100;
      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.canvasWidth = 100;
      this.cropperSettings.canvasHeight = 100;
      this.cropperSettings.dynamicSizing = true;
      this.cropperSettings.preserveSize = true;
      this.cropperSettings.noFileInput = true;

      this.headerCropperSettings = new CropperSettings();
      this.headerCropperSettings.width = 612;
      this.headerCropperSettings.height = 88;
      this.headerCropperSettings.minWidth = 570;
      this.headerCropperSettings.minHeight = 88;
      this.headerCropperSettings.croppedWidth = 570;
      this.headerCropperSettings.croppedHeight = 88;

      this.headerCropperSettings.canvasWidth = 612;
      this.headerCropperSettings.canvasHeight = 512;
      this.headerCropperSettings.noFileInput = true;

      this.headerVIDMUSPHOTCropperSettings = new CropperSettings();
      this.headerVIDMUSPHOTCropperSettings.width = 612;
      this.headerVIDMUSPHOTCropperSettings.height = 302;
      this.headerVIDMUSPHOTCropperSettings.minWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.minHeight = 302;
      this.headerVIDMUSPHOTCropperSettings.croppedWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.croppedHeight = 302;

      this.headerVIDMUSPHOTCropperSettings.canvasWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.canvasHeight = 612;
      this.headerVIDMUSPHOTCropperSettings.noFileInput = true;

      this.headerRADIOCropperSettings = new CropperSettings();
      this.headerRADIOCropperSettings.croppedWidth = 600;
      this.headerRADIOCropperSettings.croppedHeight = 600;
      this.headerRADIOCropperSettings.minWidth = 600;
      this.headerRADIOCropperSettings.minHeight = 600;
      this.headerRADIOCropperSettings.croppedWidth = 600;
      this.headerRADIOCropperSettings.croppedHeight = 600;

      this.headerRADIOCropperSettings.canvasWidth = 612;
      this.headerRADIOCropperSettings.canvasHeight = 600;
      this.headerRADIOCropperSettings.noFileInput = true;

      this.extraHeaderCropperSettings = new CropperSettings();
      this.extraHeaderCropperSettings.width = 612;
      this.extraHeaderCropperSettings.height = 88;
      this.headerCropperSettings.minWidth = 600;
      this.headerCropperSettings.minHeight = 600;
      this.headerCropperSettings.croppedWidth = 600;
      this.headerCropperSettings.croppedHeight = 600;

      this.extraHeaderCropperSettings.canvasWidth = 612;
      this.extraHeaderCropperSettings.canvasHeight = 612;
      this.extraHeaderCropperSettings.noFileInput = true;
    }


    public toggleCollapse(location: TabID) {
      const img = document.createElement('img');

      console.log("Current ID: Old: " + this.currentID);
      if (location === this.currentID) {
        //this.currentID = -1;
      }
      else {
        this.currentID = location;
        console.log("Current ID New: " + this.currentID);
      }
    }

  onChangeColor(color: Event) {
    let colorString = color + '';

    if (colorString === '#fff' || colorString === '#ffff' || colorString === '#fffff' || colorString === '#ffffff') {
      this.snackBar.open('Color Cannot Be White. Please Choose Another Color', 'Dismiss', {duration: 3000});

      if(this.selectedColor === 'primary') {
        this.deviceModel.colors['primary'] = '#000';
      }
      else {
        this.deviceModel.colors['secondary'] = '#000';
      }
    }
  }

  restoreIcon(tab: IDeviceTab)
  {
    tab.showImage = false;

    this.imgCropperIcon.forEach(
      designImgCropper => {
        if(designImgCropper.model.id == tab.id)
        {
          designImgCropper.cropper.setImage(new Image(), new Bounds());
          designImgCropper.cropper.reset();

          console.log(designImgCropper.cropper.image);
          //console.log(designImgCropper.cropper.cropper.));

          //designImgCropper.cropper.image = null;

          //designImgCropper.cropper.image.
        }
      }
    );

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
      console.log("Color Changing");
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

    // this._validationService.isValid$.subscribe(
    //   isValid => this.isSubmitEnabled = isValid
    // );
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
    this.imgCropperIcon.forEach(
      designImgCropper => {
        designImgCropper.cropper.setImage(designImgCropper.model.image.original, designImgCropper.model.image.bounds);
      }
    );

    this.imgCropper.forEach(
      designImgCropper => {
        designImgCropper.cropper.setImage(designImgCropper.model.headerImage.original, designImgCropper.model.headerImage.bounds);
      }
    );
  }

  onCrop(bounds: Bounds, tab: IDeviceTab): void {
    tab.image.bounds = bounds;
    this._deviceService.setImage(tab.id, tab.image);
  }

  onCropHeader(bounds: Bounds, tab: IDeviceTab): void {
    tab.headerImage.bounds = bounds;
    this._deviceService.setHeaderImage(tab.id, tab.headerImage);
  }

  onCropExtraHeader(bounds: Bounds, tab: IDeviceTab): void {
    tab.extraHeaderImage.bounds = bounds;
    this._deviceService.setExtraHeaderImage(tab.id, tab.headerImage);
  }
}
