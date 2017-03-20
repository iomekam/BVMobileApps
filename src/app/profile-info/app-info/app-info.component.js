"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var AppInfoComponent = (function () {
    function AppInfoComponent(form, _appInfoUpdateService) {
        this._appInfoUpdateService = _appInfoUpdateService;
        this.displayTime = 500;
        this.appNameMinCharacters = "We recommend strong, relevant keyword in your App Name. For example, a. Contraband – Free Mixtapes b. Fresh Radio – Hip-Hop and Soul c. Jayforce – Celebrity News d. DJ Kenny B – Chicago House ";
        this.shortDescriptionMaxCharacters = "No more than 80 characters";
        this.longDescriptionMaxCharacters = "No more than 4000 characters";
        this.keywordMaxCharacters = "No more than 100 keywords";
        this.appNameEmptyErrorMessage = "An App Name is required";
        this.shortDescriptionEmptyErrorMessage = "A short description is required";
        this.longDescriptionEmptyErrorMessage = "A long description is required";
        this.keywordEmptyErrorMessage = "A keyword is required";
        this.isTagTouched = false;
        this.form = form.group({
            appName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
            shortDescription: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(80)])],
            longDescription: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(4000)])],
            keywords: [[], forms_1.Validators.required]
        });
    }
    AppInfoComponent.prototype.onTagLostFocus = function (message) {
        this.isTagTouched = true;
    };
    AppInfoComponent.prototype.ngOnInit = function () {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: []
        };
    };
    AppInfoComponent.prototype.OnFocusOut = function () {
        this._appInfoUpdateService.emitChange(this.appInfo);
    };
    AppInfoComponent = __decorate([
        core_1.Component({
            selector: 'bv-app-info',
            templateUrl: './app-info.component.html',
            styleUrls: ['./app-info.component.css']
        })
    ], AppInfoComponent);
    return AppInfoComponent;
}());
exports.AppInfoComponent = AppInfoComponent;
