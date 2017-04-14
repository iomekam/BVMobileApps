import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from './device.service';
import { IDeviceModel } from './i-device-model';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit {

    public deviceModel: IDeviceModel;

    public backgroundColor = '#13afeb';

    @Input() public page: number;

    constructor(
      private _deviceService: DeviceService) {

      }


    ngOnInit() {
      this._deviceService.getModel().subscribe(
        model => this.deviceModel = model
      );
    }

}
