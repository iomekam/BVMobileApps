import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;

    private _appNameUpdatedSource: Subject<IAppInfo> = new Subject<IAppInfo>();
    appNameUpdated$ = this._appNameUpdatedSource.asObservable();

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

    getAppInfo(): IAppInfo {
        return this._appInfo;
    }

    appNameUpdated(): void {
        this._appNameUpdatedSource.next(this._appInfo);
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
