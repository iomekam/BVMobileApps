import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;

    constructor() {
        this._appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: [],
            image: ''
        };
    }

    setAppInfo(appInfo: IAppInfo): void {
        this._appInfo = appInfo;
    }

    getAppInfo(): Observable<IAppInfo> {
        return Observable.of(this._appInfo);
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
