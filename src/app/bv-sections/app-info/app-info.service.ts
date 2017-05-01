import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Bounds } from '../../ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;
    private _url = 'http://localhost:7345/api/appInfo/1';

    private ngUnsubscribe = new Subject<void>();
    private httpPutUnsubscribe = new Subject<void>();

    private _appInfoInit = new Subject<IAppInfo>();
    private _init = false;

    constructor(private _http: Http) {
        this._appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: [],
            image: {
                original: new Image(),
                originalBase64: '',
                image: '',
                bounds: new Bounds()
            }
        };

        this.init().takeUntil(this.ngUnsubscribe)
            .subscribe(
                appInfo => {
                this._appInfo = appInfo;
                this._init = true;
                this._appInfoInit.next(this._appInfo);
                this.ngUnsubscribe.next();
                this.ngUnsubscribe.complete();
            }
        );
    }

    setAppInfo(appInfo: IAppInfo): void {
        this._appInfo = appInfo;
        this._appInfo.image.originalBase64 = appInfo.image.original.src;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._http.put(this._url, JSON.stringify(this._appInfo), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
    }

    private init(): Observable<IAppInfo> {
        return this._http.get(this._url)
            .map((response: Response) => <IAppInfo> response.json())
            .do(data => {
                let image = new Image();
                image.src = data.image.originalBase64;
                data.image = {
                    original: image,
                    originalBase64: data.image.originalBase64,
                    image: data.image.image,
                    bounds: new Bounds()
                };
            });
    }

    getAppInfo(): Observable<IAppInfo> {
        if (!this._init) {
            this._appInfoInit.next(this._appInfo);
            return this._appInfoInit.asObservable();
        }
        else {
            return Observable.of(this._appInfo);
        }
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
