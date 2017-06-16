import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, AfterViewInit, QueryList, Input, HostListener } from '@angular/core';
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
import { PageLoadingService, BVPages } from '../shared/page-loading.service';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

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

    @ViewChildren('designImgCropperExtra')
    private imgCropperExtra: QueryList<DesignImageCropperComponent>;

    private cropperSettings: CropperSettings;

    private headerCropperSettings: CropperSettings;
    private headerVIDMUSPHOTCropperSettings: CropperSettings;
    private headerRADIOCropperSettings: CropperSettings;

    private extraHeaderCropperSettings: CropperSettings;

    public mainEnum = TabID.BLOG;
    public videoEnum = TabID.VIDEO;
    public musicEnum = TabID.MUSIC;
    public photoEnum = TabID.PHOTO;
    public radioEnum = TabID.RADIO;
    public moreEnum = TabID.MORE;
    public colorEnum = TabID.COLOR;

    public mainTab: IDeviceTab;
    public moreTab: IDeviceTab;

    private dragUnsub = new Subject<void>();
    private activeTabUnsub = new Subject<void>();

    constructor(
      private cpService: ColorPickerService,
      private _dragulaService: DragulaService,
      private _deviceService: DeviceService,
      private _headerService: HeaderService,
      private _pageValidation: PageLoadingService,
      private _validationService: ValidationService,
      private _router: Router,
      private snackBar: MdSnackBar) {

      this.cropperSettings = new CropperSettings();
      this.cropperSettings.width = 100;
      this.cropperSettings.height = 100;
      this.cropperSettings.croppedWidth = 100;
      this.cropperSettings.croppedHeight = 100;
      this.cropperSettings.canvasWidth = 100;
      this.cropperSettings.canvasHeight = 100;
      this.cropperSettings.dynamicSizing = true;
      this.cropperSettings.preserveSize = true;
      this.cropperSettings.noFileInput = true;

      this.headerCropperSettings = new CropperSettings();
      this.headerCropperSettings.width = 570;
      this.headerCropperSettings.height = 88;
      this.headerCropperSettings.minWidth = 570;
      this.headerCropperSettings.minHeight = 88;
      this.headerCropperSettings.croppedWidth = 570;
      this.headerCropperSettings.croppedHeight = 88
      this.headerCropperSettings.noFileInput = true;

      this.headerCropperSettings.canvasWidth = 570;
      this.headerCropperSettings.canvasHeight = 88;

      this.headerVIDMUSPHOTCropperSettings = new CropperSettings();
      this.headerVIDMUSPHOTCropperSettings.width = 612;
      this.headerVIDMUSPHOTCropperSettings.height = 302;
      this.headerVIDMUSPHOTCropperSettings.minWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.minHeight = 302;
      this.headerVIDMUSPHOTCropperSettings.croppedWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.croppedHeight = 302;
      this.headerVIDMUSPHOTCropperSettings.noFileInput = true;


      this.headerVIDMUSPHOTCropperSettings.canvasWidth = 612;
      this.headerVIDMUSPHOTCropperSettings.canvasHeight = 302;

      this.headerRADIOCropperSettings = new CropperSettings();
      this.headerRADIOCropperSettings.croppedWidth = 600;
      this.headerRADIOCropperSettings.croppedHeight = 600;
      this.headerRADIOCropperSettings.minWidth = 600;
      this.headerRADIOCropperSettings.minHeight = 600;
      this.headerRADIOCropperSettings.croppedWidth = 600;
      this.headerRADIOCropperSettings.croppedHeight = 600;

      this.headerRADIOCropperSettings.canvasWidth = 600;
      this.headerRADIOCropperSettings.canvasHeight = 600;
      this.headerRADIOCropperSettings.noFileInput = true;

      this.extraHeaderCropperSettings = new CropperSettings();
      this.extraHeaderCropperSettings.width = 300;
      this.extraHeaderCropperSettings.height = 88;
      this.extraHeaderCropperSettings.minWidth = 300;
      this.extraHeaderCropperSettings.minHeight = 88;
      this.extraHeaderCropperSettings.croppedWidth = 300;
      this.extraHeaderCropperSettings.croppedHeight = 88;

      this.extraHeaderCropperSettings.noFileInput = true;
      this.extraHeaderCropperSettings.canvasWidth = 300;
      this.extraHeaderCropperSettings.canvasHeight = 88;
    }


    public toggleCollapse(location: TabID) {
      const img = document.createElement('img');

      if (location !== this.currentID) {
        this.currentID = location;
      }
    }

    public print(tab: IDeviceTab) {
      console.log(tab);
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

          tab.image.image = "";
          tab.image.originalBase64 = "";
          tab.image.original = new Image();
          tab.image.bounds = new Bounds();

          this._deviceService.setImage(tab.id, tab.image);
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

    this._dragulaService.drop.takeUntil(this.dragUnsub).subscribe((value) => {
      this.onDrop(value.slice(1));
    });

    this.deviceModel = this._deviceService.getModel();
    this.mainTab = this._deviceService.getTab(TabID.BLOG);
    this.moreTab = this._deviceService.getTab(TabID.MORE);

    this._pageValidation.savePage(BVPages.DESIGN);
    this._deviceService.activeTabChanged$.takeUntil(this.activeTabUnsub).subscribe(
      id => {
        this.toggleCollapse(id);
      }
    )
  }

  ngOnDestroy() {
    this._dragulaService.destroy('drag-bag');
    this._deviceService.saveModel();
    this.dragUnsub.next();
    this.dragUnsub.complete();
    this.activeTabUnsub.next();
    this.activeTabUnsub.complete();

    this.deviceModel.activeTab = null;
  }

  @HostListener('window:beforeunload')
  onRefresh() {
    const model = this._deviceService.getFullModel();

    let xhr = new XMLHttpRequest()
    console.log(this.deviceModel);
     xhr.open("PUT", this._deviceService.getUrl(), false);
     xhr.setRequestHeader("Content-type", "application/json");
     xhr.send(JSON.stringify(model));
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

    this.imgCropperExtra.forEach(
      designImgCropper => {
        designImgCropper.cropper.setImage(designImgCropper.model.extraHeaderImage.original, designImgCropper.model.extraHeaderImage.bounds);
      }
    );
  }

  onCrop(bounds: Bounds, tab: IDeviceTab): void {
    tab.image.bounds = bounds;
    tab.image.originalBase64 = tab.image.original.src;
    this._deviceService.setImage(tab.id, tab.image);
  }

  onCropHeader(bounds: Bounds, tab: IDeviceTab): void {
    console.log(tab);
    tab.headerImage.bounds = bounds;
    tab.headerImage.originalBase64 = tab.headerImage.original.src;
    this._deviceService.setHeaderImage(tab.id, tab.headerImage);
  }

  onCropExtraHeader(bounds: Bounds, tab: IDeviceTab): void {
    tab.extraHeaderImage.bounds = bounds;
    tab.extraHeaderImage.originalBase64 = tab.extraHeaderImage.original.src;
    this._deviceService.setExtraHeaderImage(tab.id, tab.extraHeaderImage);
  }
}
