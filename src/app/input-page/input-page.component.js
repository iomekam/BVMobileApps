"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var InputPageComponent = (function () {
    function InputPageComponent(_appInfoUpdateService) {
        var _this = this;
        this._appInfoUpdateService = _appInfoUpdateService;
        this.appInfoID = 0;
        this.profileInfoID = 1;
        this.blogInfoID = 2;
        this.currentHeader = this.appInfoID;
        this.showPrevButton = this.currentHeader > this.appInfoID;
        _appInfoUpdateService.emitSource.asObservable().subscribe(function (appInfo) {
            _this.appInfo = appInfo;
        });
    }
    InputPageComponent.prototype.onCurrentHeaderChanged = function (header) {
        if (isNaN(header) || header == this.currentHeader) {
            return;
        }
        this.currentHeader = header;
        this.updateShowPreviousButton();
    };
    InputPageComponent.prototype.next = function () {
        this.currentHeader++;
        this.updateShowPreviousButton();
    };
    InputPageComponent.prototype.prev = function () {
        this.currentHeader--;
        this.updateShowPreviousButton();
    };
    InputPageComponent.prototype.updateShowPreviousButton = function () {
        this.showPrevButton = this.currentHeader > this.appInfoID;
    };
    InputPageComponent.prototype.isNextButtonDisabled = function () {
        return this.currentHeader >= this.blogInfoID;
    };
    InputPageComponent.prototype.ngOnInit = function () {
        this.appInfo = {
            appName: '',
            shortDescription: '',
            longDescription: '',
            keywords: []
        };
    };
    InputPageComponent.prototype.ngOnDestroy = function () {
        this._appInfoUpdateService.emitSource.unsubscribe();
    };
    InputPageComponent = __decorate([
        core_1.Component({
            selector: 'bv-input-page',
            templateUrl: './input-page.component.html',
            styleUrls: ['./input-page.component.css']
        })
    ], InputPageComponent);
    return InputPageComponent;
}());
exports.InputPageComponent = InputPageComponent;
