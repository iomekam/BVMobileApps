/**
 * Created by rafa2093 on 3/18/2017.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {ISocialInfo} from "./ISocialInfo";

@Injectable()
export class SocialUpdateServiceService {

  emitSource: Subject<ISocialInfo> = new Subject<ISocialInfo>();

  constructor() { }

  emitChange(change: ISocialInfo) {
    this.emitSource.next(change);
  }

}
