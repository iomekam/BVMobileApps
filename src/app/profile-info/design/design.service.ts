import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DesignService {

    private _appInfo: string;

    private _appNameUpdatedSource: Subject<string> = new Subject<string>();
    appNameUpdated$ = this._appNameUpdatedSource.asObservable();

    constructor() {
        this._appInfo = "";
    }

    setAppInfo(appInfo: string): void {
        this._appInfo = appInfo;
    }

    getAppInfo(): string {
        return this._appInfo;
    }

    appNameUpdated(): void {
        this._appNameUpdatedSource.next(this._appInfo);
    }

    isAppNameUnique(): boolean {
        return true;
    }
}
