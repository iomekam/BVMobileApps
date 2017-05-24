import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from '../../header/header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { IAppInfo } from '../app-info/iapp-info'
import { LastCompleted } from '../shared/page-loading.service';
import { DeviceService } from '../device-mockup/device.service';
import { IDeviceModel } from '../device-mockup/i-device-model';
import { AppInfoService } from '../app-info/app-info.service';
import { MediaUpdateService } from '../profile-info/media-update.service';
import { IProfileModel } from '../profile-info/iprofile-model';
import { BlogPostService } from '../blog/blog-post.service';
import { IBlogPost } from '../blog/iblog-post';
import { SharedService } from '../shared/shared.service';

function getWindow (): any {
    return window;
}

function startLoad (): any {
   getWindow().loading = getWindow().pleaseWait({
        logo: "assets/img/logo.png",
        backgroundColor: '#0099ff',
        loadingHtml: "<p class='loading-message'>Loading... please wait</p>"
      });
}

function endLoad (): any {
   getWindow().loading.finish();
}

@Component({
  selector: 'bv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;

  constructor(
    private _router: Router,
    private _headerService: HeaderService,
    private _deviceService: DeviceService,
    private _appInfoService: AppInfoService,
    private _profileService: MediaUpdateService,
    private _blogPostService: BlogPostService,
    private _sharedService: SharedService,
    private _http: Http) { }

  ngOnInit() {
  }

  hash() {
    var hash = 0, i, chr;
    if (this.username.length === 0) return hash;

    for (i = 0; i < this.username.length; i++) {
      chr   = this.username.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  login() {
      startLoad();
      this._sharedService.id = this.hash();
      this._sharedService.username = this.username;
      Observable.forkJoin(
        this._http.get(this._sharedService.url + '/api/lastcompleted/' + this._sharedService.id).map(response => { return <LastCompleted> response.json(); }),
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
                endLoad();

                return true;
              }
            ).subscribe(t => t);
  }

}
