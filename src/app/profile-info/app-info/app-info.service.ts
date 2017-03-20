import { Injectable } from '@angular/core';
import { IAppInfo } from './iapp-info';

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

    getAppInfo(): IAppInfo {
        return this._appInfo;
    }
}
