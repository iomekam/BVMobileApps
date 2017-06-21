import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Bounds } from '../../ng2-img-cropper';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../shared/validation.service';
import { SharedService } from '../shared/shared.service';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;
    private _url = '/api/appInfo';

    private httpPutUnsubscribe = new Subject<void>();

    constructor(
        private _validationService: ValidationService,
        private _sharedService: SharedService,
        private _authHttp: AuthHttp) {
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

        this._url = this._sharedService.url + this._url;
    }

    public setDataAfterFetch(model: IAppInfo) {
        this._appInfo = model;
   
        const appInfoPageValid = this._appInfo.appName !== '' && this._appInfo.image.image !== '' && this._appInfo.keywords.length > 0 && this._appInfo.longDescription !== '';
        this._validationService.setAppInfoValid(appInfoPageValid);
     }

    public fetchData() : Observable<IAppInfo> {
        return this.init();
    }

    getUrl(): string {
      return this._url;
    }

    setAppInfo(appInfo: IAppInfo): void {
        this._appInfo = appInfo;
        this._appInfo.image.originalBase64 = appInfo.image.original.src;
        
        if(this._sharedService.isOfflineMode()) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        
        this._authHttp.put(this._url, JSON.stringify(this._appInfo), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => this._sharedService.onHttpError(error)
        );
    }

    private init(): Observable<IAppInfo> {

        if(this._sharedService.isOfflineMode()) {
            return;
        }

        return this._authHttp.get(this._url)
            .map((response: Response) => <IAppInfo> response.json())
            .do(data => {
                let image = new Image();
                image.src = data.image.originalBase64;
                data.image = {
                    original: image,
                    originalBase64: data.image.originalBase64,
                    image: data.image.image,
                    bounds: new Bounds(data.image.bounds.left, data.image.bounds.top, data.image.bounds.right - data.image.bounds.left, data.image.bounds.bottom - data.image.bounds.top)
                };
            },
            error => this._sharedService.onHttpError(error));
    }

    getAppInfo() {
        return this._appInfo;
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
