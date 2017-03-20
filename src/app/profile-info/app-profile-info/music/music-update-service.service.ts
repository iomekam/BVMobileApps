/**
 * Created by rafa2093 on 3/18/2017.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {IMusicInfo} from "./IMusicInfo";

@Injectable()
export class MusicUpdateServiceService {

  emitSource: Subject<IMusicInfo> = new Subject<IMusicInfo>();

  constructor() { }

  emitChange(change: IMusicInfo) {
    this.emitSource.next(change);
  }

}
