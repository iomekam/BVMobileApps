import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAppInfo } from './iapp-info';
import { CropperSettings, ImageCropperComponent, Bounds } from '../../ng2-img-cropper';
import { AppInfoService } from './app-info.service';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { DeviceService } from '../device-mockup/device.service';
import { ValidationService } from '../shared/validation.service';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'bv-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css'],
})

export class AppInfoComponent implements OnInit, AfterViewInit, OnDestroy {

    private readonly displayTime = 150;

    private readonly appNameMinCharacters = `
    We recommend strong, relevant keyword in your App Name. For example, 
    a. Contraband – Free Mixtapes 
    b. Fresh Radio – Hip-Hop and Soul 
    c. Jayforce – Celebrity News 
    d. DJ Kenny B – Chicago House "`;

    private readonly shortDescriptionMaxCharacters = 'No more than 80 characters';
    private readonly longDescriptionMaxCharacters = 'No more than 4000 characters';
    private readonly keywordMaxCharacters = 'No more than 100 keywords';

    private readonly appNameEmptyErrorMessage = 'An App Name is required';
    private readonly shortDescriptionEmptyErrorMessage = 'A short description is required';
    private readonly longDescriptionEmptyErrorMessage = 'A long description is required';
    private readonly keywordEmptyErrorMessage = 'A keyword is required';

    private appInfo: IAppInfo;
    private form: FormGroup;

    private isTagTouched = false;
    private cropperSettings: CropperSettings;

    @ViewChild('cropper', undefined)
    private cropper: ImageCropperComponent;

    public _appInfoPageValid: boolean;

    constructor(
        form: FormBuilder,
        private _appInfoService: AppInfoService,
        private _deviceService: DeviceService,
        private _validationService: ValidationService,
        private _headerService: HeaderService) {
        this.form = form.group({
            appName: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
            shortDescription: ['', Validators.compose([Validators.required, Validators.maxLength(80)])],
            longDescription: ['', Validators.compose([Validators.required, Validators.maxLength(4000)])],
            keywords: [[], Validators.required]
        });

        // For app-info page, we want the image to be 512x600
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 512;
        this.cropperSettings.croppedWidth = 600;
        this.cropperSettings.croppedHeight = 512;
        this.cropperSettings.canvasWidth = 600;
        this.cropperSettings.canvasHeight = 512;
    }

    private onTagLostFocus(message: string): void {
        this.isTagTouched = true;
        this.validate();
    }

    ngOnInit() {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: [],
            image: {
                original: new Image(),
                image: '',
                bounds: new Bounds()
            }
        };

        this._appInfoService.getAppInfo().subscribe(
            appInfo => this.appInfo = appInfo
        );
    }

    ngAfterViewInit(): void {
        this.cropper.setImage(this.appInfo.image.original, this.appInfo.image.bounds);
    }

    ngOnDestroy(): void {
        this._appInfoService.setAppInfo(this.appInfo);
    }

    validate(): void {
        this._appInfoPageValid = this.appInfo.appName !== '' && this.appInfo.image.image !== '' && this.appInfo.keywords.length > 0 && this.appInfo.longDescription !== '';
        this._validationService.setAppInfoValid(this._appInfoPageValid);
    }

    onInput(): void {
        this._deviceService.setAppName(this.appInfo.appName);
        this.validate();
    }

    onInputForValidation(): void {
        this.validate();
    }

    onCrop(bounds: Bounds): void {
        this.appInfo.image.bounds = bounds;
        this.validate();
    }
}
