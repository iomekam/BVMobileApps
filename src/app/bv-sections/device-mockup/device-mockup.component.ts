import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from './device.service';
import {IDeviceModel, IDeviceTab} from './i-device-model';
import {AppInfoService} from '../app-info/app-info.service';
import {IAppInfo} from '../app-info/iapp-info';

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
      private _appInfoService: AppInfoService) {

      }

  test(): any
  {
    return {height: '100px',
      background:'#000000'}
  }

    ngOnInit() {
      this._deviceService.getModel().subscribe(
        model => this.deviceModel = model
      );

      this._appInfoService.getAppInfo().subscribe(
        appInfo => this.appInfo = appInfo
      );

      this.deviceModel.activeTab = this.deviceModel.tabs[0];
    }

}
