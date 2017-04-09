import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppInfoService {

    private _appInfo: IAppInfo;

    private _appNameUpdatedSource: Subject<IAppInfo> = new Subject<IAppInfo>();
    appNameUpdated$ = this._appNameUpdatedSource.asObservable();

    private _appInfoSource: Subject<IAppInfo> = new Subject<IAppInfo>();
    appInfo$ = this._appInfoSource.asObservable();

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

    appNameUpdated(): void {
        this._appNameUpdatedSource.next(this._appInfo);
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
