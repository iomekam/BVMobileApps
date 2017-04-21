"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var MusicComponent = (function () {
    function MusicComponent(form, _appInfoUpdateService) {
        this._appInfoUpdateService = _appInfoUpdateService;
        this.appNameMinCharacters = "We recommend strong, relevant keyword in your App Name. For example, a. Contraband – Free Mixtapes b. Fresh Radio – Hip-Hop and Soul c. Jayforce – Celebrity News d. DJ Kenny B – Chicago House ";
        this.appNameEmptyErrorMessage = "An App Name is required";
        this.form = form.group({
            appName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
        });
    }
    MusicComponent.prototype.ngOnInit = function () {
        this.appInfo = {
            appName: ''
        };
    };
    MusicComponent = __decorate([
        core_1.Component({
            selector: 'bv-music',
            templateUrl: './music.component.html',
            styleUrls: ['./music.component.css']
        })
    ], MusicComponent);
    return MusicComponent;
}());
exports.MusicComponent = MusicComponent;
