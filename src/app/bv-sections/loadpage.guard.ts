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
import { AppInfoService } from './app-info/app-info.service';
import { MediaUpdateService } from './profile-info/media-update.service';
import { IProfileModel } from './profile-info/iprofile-model';
import { BlogPostService } from './blog/blog-post.service';
import { IBlogPost } from './blog/iblog-post';
import { SharedService } from './shared/shared.service';

function getWindow (): any {
    return window;
}

@Injectable()
export class LoadpageGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _headerService: HeaderService,
    private _deviceService: DeviceService,
    private _appInfoService: AppInfoService,
    private _profileService: MediaUpdateService,
    private _blogPostService: BlogPostService,
    private _sharedService: SharedService,
    private _http: Http) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.init();
  }

  init() : Observable<boolean> {
      return Observable.forkJoin(
        this._http.get(this._sharedService.url + '/api/lastcompleted/1').map(response => { return <LastCompleted> response.json(); }),
        this._deviceService.fetchData(),
        this._appInfoService.fetchData(),
        this._profileService.fetchData(),
        this._blogPostService.fetchData(),
        ).map(
              data => {
                this._deviceService.setDataAfterFetch(<IDeviceModel>data[1]);
                this._appInfoService.setDataAfterFetch(<IAppInfo>data[2]);
                this._profileService.setDataAfterFetch(<IProfileModel>data[3]);
                this._blogPostService.setDataAfterFetch(<IBlogPost[]>data[4]);

                console.log(data);
                this._headerService.goto((<LastCompleted>data[0]).lastPage);
                getWindow().loading_screen.finish();

                return true;
              }
            );
  }
}
