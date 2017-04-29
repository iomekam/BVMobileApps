import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HeaderService {

  private _nextSource: Subject<void> = new Subject<void>();
  next$ = this._nextSource.asObservable();

  private _prevSource: Subject<void> = new Subject<void>();
  prev$ = this._prevSource.asObservable();

  constructor() { }

  public next():void {
    console.log("g");
    this._nextSource.next();
  }

  public prev():void {
    this._prevSource.next();
  }

}
