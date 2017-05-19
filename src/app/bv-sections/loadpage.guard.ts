import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from '../header/header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { IAppInfo } from './app-info/iapp-info'
import { LastCompleted } from './shared/page-loading.service';
import { DeviceService } from './device-mockup/device.service';
import { IDeviceModel } from './device-mockup/i-device-model';

function getWindow (): any {
    return window;
}

@Injectable()
export class LoadpageGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _headerService: HeaderService,
    private _deviceService: DeviceService,
    private _http: Http) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.init();
  }

  init() : Observable<boolean> {
      return Observable.forkJoin(
        this._http.get('http://localhost:7345/api/lastcompleted/1')
          .map(response => {
              const info = <LastCompleted> response.json();
              this._headerService.goto(info.lastPage);
              
            }),
        this._deviceService.fetchData()
        ).map(
              data => {
                this._deviceService.setDataAfterFetch(<IDeviceModel>data[1]);
                getWindow().loading_screen.finish();

                return true;
              }
            );
  }
}
