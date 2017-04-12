import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OnsenModule } from 'angular2-onsenui';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { DeviceService } from './device.service';
import { IDeviceModel } from './i-device-model';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit, OnDestroy {

    public deviceModel: IDeviceModel;

    public backgroundColor = '#13afeb';

    @Input() public page: number;

    constructor(
      private _dService: DragulaService,
      private _deviceService: DeviceService) {

      }

    onDrag() {

    }

    onDrop() {

    }

    ngOnInit() {
      this._dService.setOptions('test', {
        copy: true
      });

      this.deviceModel = this._deviceService.getModel();
    }

    ngOnDestroy() {
      this._dService.destroy('test');
    }
}
