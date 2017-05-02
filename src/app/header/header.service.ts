import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HeaderService {

  private _nextSource: Subject<void> = new Subject<void>();
  next$ = this._nextSource.asObservable();

  private _prevSource: Subject<void> = new Subject<void>();
  prev$ = this._prevSource.asObservable();

  private _gotoSource: Subject<number> = new Subject<number>();
  goto$ = this._gotoSource.asObservable();

  constructor() { }

  public next():void {
    this._nextSource.next();
  }

  public goto(id: number) {
    this._gotoSource.next(id);
  }

  public prev():void {
    this._prevSource.next();
  }

}
