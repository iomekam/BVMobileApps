import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Bounds } from '../../ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;
    private _url = 'http://localhost:7345/api/appInfo';
    
    private init = false;
    private ngUnsubscribe = new Subject<void>();

    constructor(private _http: Http) {
        this._appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: [],
            image: {
                original: new Image(),
                image: '',
                bounds: new Bounds()
            }
        };

        this.getAppInfo().takeUntil(this.ngUnsubscribe)
            .subscribe(
                appInfo => 
                {
                    this.init = true;
                    this._appInfo = appInfo;
                    this.ngUnsubscribe.next();
                    this.ngUnsubscribe.complete();
                }
        );
    }

    setAppInfo(appInfo: IAppInfo): void {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post(this._url, JSON.stringify(this._appInfo), {headers: headers})
                .map(res => res.json()).subscribe(
                    data => console.log("success"),
                    error => console.log(error)
        );
    }

    getAppInfo(): Observable<IAppInfo> {
        if (this.init === false) {
            return this._http.get(this._url)
                .map((response: Response) =><IAppInfo> response.json())
        }
        else {
            return Observable.of(this._appInfo);
        } 
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
