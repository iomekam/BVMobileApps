import { Component, OnInit } from '@angular/core';
import { IAppInfo } from '../profile-info/app-info/iapp-info';
import { AppInfoUpdateServiceService } from '../profile-info/app-info/app-info-update-service.service';

@Component({
  selector: 'bv-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.css']
})
export class InputPageComponent implements OnInit {

    readonly appInfoID: number = 0;
    readonly profileInfoID: number = 1;
    readonly blogInfoID: number = 2;

    currentHeader: number = this.appInfoID;
    showPrevButton: boolean = this.currentHeader > this.appInfoID;

    appInfo: IAppInfo;

    constructor(private _appInfoUpdateService: AppInfoUpdateServiceService) {
        _appInfoUpdateService.emitSource.asObservable().subscribe(
            appInfo => {
                this.appInfo = appInfo;
            }
        );
    }

    private onCurrentHeaderChanged(header: number): void {
        if (isNaN(header) || header == this.currentHeader) {
            return;
        }

        this.currentHeader = header;
        this.updateShowPreviousButton();
    }

    private next(): void {
        this.currentHeader++;
        this.updateShowPreviousButton();
    }

    private prev(): void {
        this.currentHeader--;
        this.updateShowPreviousButton();
    }

    private updateShowPreviousButton(): void {
        this.showPrevButton = this.currentHeader > this.appInfoID;
    }

    private isNextButtonDisabled(): boolean {
      return this.currentHeader >= this.blogInfoID;
    }

    ngOnInit(): void {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: []
        };
    }

}
