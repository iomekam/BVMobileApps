import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { SharedService } from './shared.service';
import { AuthHttp } from 'angular2-jwt';

export enum BVPages {
    APP_INFO,
    PROFILE_INFO,
    BLOG,
    DESIGN
}

export interface LastCompleted
{
    lastPage: number;
    username: string;
}

@Injectable()
export class PageLoadingService {

  private _url = '/api/lastcompleted';
  private httpPutUnsubscribe = new Subject<void>();

  constructor(
      private _authHttp: AuthHttp,
      private _sharedService: SharedService) { 
          this._url = this._sharedService.url + this._url
      }

  public savePage(page: BVPages) {

    if(this._sharedService.isOfflineMode()) {
        return;
    }
    
    let lastPage = {
      lastPage: page,
      username: this._sharedService.username
    };
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    this._authHttp.put(this._url, JSON.stringify(lastPage), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => this._sharedService.onHttpError(error));
  }
}
