﻿import {Component, OnInit, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAppInfo } from './iapp-info';
import { AppInfoUpdateServiceService } from './app-info-update-service.service';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'bv-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css'],
})
export class AppInfoComponent implements OnInit {

    private readonly displayTime: number = 500;

    private readonly appNameMinCharacters: string = "We recommend strong, relevant keyword in your App Name. For example, a. Contraband – Free Mixtapes b. Fresh Radio – Hip-Hop and Soul c. Jayforce – Celebrity News d. DJ Kenny B – Chicago House ";
    private readonly shortDescriptionMaxCharacters: string = "No more than 80 characters"
    private readonly longDescriptionMaxCharacters: string = "No more than 4000 characters"
    private readonly keywordMaxCharacters: string = "No more than 100 keywords"

    private readonly appNameEmptyErrorMessage: string = "An App Name is required";
    private readonly shortDescriptionEmptyErrorMessage: string = "A short description is required";
    private readonly longDescriptionEmptyErrorMessage: string = "A long description is required";
    private readonly keywordEmptyErrorMessage: string = "A keyword is required";

    private appInfo: IAppInfo;
    private form: FormGroup;

    private isTagTouched: boolean = false;

    private data: any;
    private cropperSettings: CropperSettings;

    constructor(form: FormBuilder, private _appInfoUpdateService: AppInfoUpdateServiceService) {
        this.form = form.group({
            appName: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            shortDescription: ['', Validators.compose([Validators.required, Validators.maxLength(80)])],
            longDescription: ['', Validators.compose([Validators.required, Validators.maxLength(4000)])],
            keywords: [[], Validators.required]
        })

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.data = {};
    }

    private onTagLostFocus(message: string): void {
        this.isTagTouched = true;
    }

    ngOnInit() {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: []
        };
    }

    OnFocusOut(): void {
        this._appInfoUpdateService.emitChange(this.appInfo);
    }

}
