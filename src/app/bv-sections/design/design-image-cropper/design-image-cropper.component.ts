import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { BvImage } from '../../shared/bv-image';
import { IDeviceTab } from '../../device-mockup/i-device-model';
import { CropperSettings, ImageCropperComponent, Bounds } from '../../../ng2-img-cropper';
import { DeviceService } from '../../device-mockup/device.service';

@Component({
  selector: 'bv-design-image-cropper',
  templateUrl: './design-image-cropper.component.html',
  styleUrls: ['./design-image-cropper.component.css']
})
export class DesignImageCropperComponent implements OnInit {

  @Input() image: BvImage;
  @Input() settings: CropperSettings;
  @Input() model: IDeviceTab;

  @Output() onCrop: EventEmitter<Bounds> = new EventEmitter<Bounds>();

  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;

  constructor(private _deviceService: DeviceService) {

  }

  ngOnInit() {
  }

  onCropDone(bounds: Bounds): void {
    this.onCrop.emit(bounds);
  }

}
