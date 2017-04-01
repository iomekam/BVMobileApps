import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppInfo } from '../profile-info/app-info/iapp-info';
import { AppInfoService } from '../profile-info/app-info/app-info.service';
import { Subscription } from 'rxjs/Subscription';
import {DesignService} from "../profile-info/design/design.service";


@Component({
  selector: 'bv-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})
export class InputPageComponent implements OnInit {

    readonly appInfoID: number = 0;
    readonly profileInfoID: number = 1;
    readonly blogInfoID: number = 2;

    appInfo: IAppInfo;

    backgroundColor : string = "#13afeb";

    private _appInfoUpdatedSub: Subscription;
    private _colorUpdatedSub: Subscription;

    constructor(private _appInfoService: AppInfoService, private _designService: DesignService ) {
        this._appInfoUpdatedSub = _appInfoService.appNameUpdated$.subscribe(
            appInfo => {
                this.appInfo = appInfo;
            }


        );

        this._colorUpdatedSub = _designService.appNameUpdated$.subscribe(
             backgroundColor => {this.backgroundColor = backgroundColor}
        )
    }

    ngOnInit(): void {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: [],
            image: '',
        };
    }

    ngOnDestroy(): void {
        this._appInfoUpdatedSub.unsubscribe();
        this._colorUpdatedSub.unsubscribe();
    }
}
