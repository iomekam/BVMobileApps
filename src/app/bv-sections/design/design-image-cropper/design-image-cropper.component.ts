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

  clearThings(test: any)
  {
    test.toElement.value = "";
    console.log(test);
    console.log("lol");
  }
  /**
   * Used to send image to second cropper
   * @param $event
   */
  fileChangeListener($event) {
    console.log("Change detected");
    let image:any = new Image();
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();
    let that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };

    myReader.readAsDataURL(file);
  }

}
