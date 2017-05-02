import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

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

  private _url = 'http://localhost:7345/api/lastcompleted/1';
  private ngUnsubscribe = new Subject<void>();
  private httpPutUnsubscribe = new Subject<void>();

  constructor(private _http: Http) { }

  public savePage(page: BVPages) {
    let lastPage = {
      lastPage: page
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    console.log(JSON.stringify(lastPage));

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
