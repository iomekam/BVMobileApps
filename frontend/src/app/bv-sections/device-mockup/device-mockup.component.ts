import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from './device.service';
import { IDeviceModel, IDeviceTab } from './i-device-model';
import { AppInfoService } from '../app-info/app-info.service';
import { IAppInfo } from '../app-info/iapp-info';
import { Bounds } from '../../ng2-img-cropper';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit {

    public deviceModel: IDeviceModel;

    public appInfo: IAppInfo;

    public backgroundColor = '#333333';


    public currentTab: IDeviceTab;



    @Input() public page: number;

    constructor(
      private _deviceService: DeviceService,
      private _appInfoService: AppInfoService) {}


    ngOnInit() {

      this.deviceModel = this._deviceService.getModel();
      this.appInfo = this._appInfoService.getAppInfo();
    }

    tabClicked(tab: IDeviceTab) {
      this.deviceModel.activeTab = tab;
      this._deviceService.setActiveTabChanged(tab.id);
    }

}