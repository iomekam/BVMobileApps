import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { SharedService } from './shared.service';

export enum BVPages {
    APP_INFO,
    PROFILE_INFO,
    BLOG,
    DESIGN
}

export interface LastCompleted
{
    lastPage: number;
}

@Injectable()
export class PageLoadingService {

  private _url = '/api/lastcompleted/';
  private httpPutUnsubscribe = new Subject<void>();
  private isIdSet = false;

  constructor(
      private _http: Http,
      private _sharedService: SharedService) { 
      }

  public savePage(page: BVPages) {
    let lastPage = {
      lastPage: page
    };

    if(this.isIdSet === false) {
        this._url = this._sharedService.url + this._url + this._sharedService.id;
        this.isIdSet = true;
    }
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    this._http.put(this._url, JSON.stringify(lastPage), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
  }
}
