import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { IAppInfo } from './iapp-info';

@Injectable()
export class AppInfoUpdateServiceService {

    emitSource: Subject<IAppInfo> = new Subject<IAppInfo>();

    constructor() { }

    emitChange(change: IAppInfo) {
        this.emitSource.next(change);
    }

}
