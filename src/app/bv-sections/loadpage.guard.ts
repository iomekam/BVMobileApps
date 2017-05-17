import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from '../header/header.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { IAppInfo } from './app-info/iapp-info'
import { LastCompleted } from './shared/page-loading.service';


function getWindow (): any {
    return window;
}

@Injectable()
export class WindowRefService {
    public nativeWindow (): any {
        return getWindow();
    }
}

@Injectable()
export class LoadpageGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _headerService: HeaderService,
    private _http: Http,
    private _window: WindowRefService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._http.get('http://localhost:7345/api/lastcompleted/1')
            .map(response => {
              const info = <LastCompleted> response.json();
              this._headerService.goto(info.lastPage);
              this._window.nativeWindow().loading_screen.finish();
              return true;

            })
  }
}
