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

    public imgSrc = 'https://mail.google.com/mail/u/0/?ui=2&ik=8ac8202056&view=fimg&th=15b4ef8a7dcbdc3a&attid' +
                    '=0.1&disp=inline&realattid=15b4ef61d162a8c0a511&safe=1&attbid=ANGjdJ_wSBFbE0tDBA1LZnxjNU' +
                    'm3r0HJE-CPU8pHzBNLToK0LbjXi_geOkOd7n-0DA8dW5dEAmtgkob38TbBnIFu8OkJhbmXiiz4B3SjoJF1MOPJ_8' +
                    'I4CfV4R9OUI60&ats=1491975303061&rm=15b4ef8a7dcbdc3a&zw&sz=w1920-h950';

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

      this._deviceService.getModel().subscribe(
        model => this.deviceModel = model
      );
    }

    ngOnDestroy() {
      this._dService.destroy('test');
    }
}
