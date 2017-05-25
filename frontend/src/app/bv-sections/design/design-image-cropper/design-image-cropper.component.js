"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var DesignImageCropperComponent = (function () {
    function DesignImageCropperComponent(_deviceService) {
        this._deviceService = _deviceService;
        this.onCrop = new core_1.EventEmitter();
    }
    DesignImageCropperComponent.prototype.ngOnInit = function () {
    };
    DesignImageCropperComponent.prototype.onCropDone = function (bounds) {
        this.onCrop.emit(bounds);
    };
    __decorate([
        core_1.Input()
    ], DesignImageCropperComponent.prototype, "image", void 0);
    __decorate([
        core_1.Input()
    ], DesignImageCropperComponent.prototype, "settings", void 0);
    __decorate([
        core_1.Input()
    ], DesignImageCropperComponent.prototype, "model", void 0);
    __decorate([
        core_1.Output()
    ], DesignImageCropperComponent.prototype, "onCrop", void 0);
    __decorate([
        core_1.ViewChild('cropper', undefined)
    ], DesignImageCropperComponent.prototype, "cropper", void 0);
    DesignImageCropperComponent = __decorate([
        core_1.Component({
            selector: 'bv-design-image-cropper',
            templateUrl: './design-image-cropper.component.html',
            styleUrls: ['./design-image-cropper.component.css']
        })
    ], DesignImageCropperComponent);
    return DesignImageCropperComponent;
}());
exports.DesignImageCropperComponent = DesignImageCropperComponent;
