"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var i_device_model_1 = require('../device-mockup/i-device-model');
var ng2_img_cropper_1 = require('../../ng2-img-cropper');
var Cmyk = (function () {
    function Cmyk(c, m, y, k) {
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
    }
    return Cmyk;
}());
exports.Cmyk = Cmyk;
var DesignComponent = (function () {
    function DesignComponent(cpService, _dragulaService, _deviceService) {
        this.cpService = cpService;
        this._dragulaService = _dragulaService;
        this._deviceService = _deviceService;
        this.selectedColor = 'primary';
        this.colorTabID = i_device_model_1.TabID.COLOR;
        this.currentID = this.colorTabID;
        this.cmyk = new Cmyk(0, 0, 0, 0);
        this.cropperSettings = new ng2_img_cropper_1.CropperSettings();
        this.cropperSettings.width = 600;
        this.cropperSettings.height = 512;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 100;
        this.cropperSettings.canvasHeight = 100;
        this.cropperSettings.dynamicSizing = true;
        this.cropperSettings.preserveSize = true;
        this.headerCropperSettings = new ng2_img_cropper_1.CropperSettings();
        this.headerCropperSettings.width = 612;
        this.headerCropperSettings.height = 88;
        this.headerCropperSettings.minWidth = 570;
        this.headerCropperSettings.minHeight = 88;
        this.headerCropperSettings.croppedWidth = 570;
        this.headerCropperSettings.croppedHeight = 88;
        this.headerCropperSettings.canvasWidth = 612;
        this.headerCropperSettings.canvasHeight = 512;
    }
    DesignComponent.prototype.toggleCollapse = function (location) {
        var img = document.createElement('img');
        if (location === this.currentID) {
            this.currentID = -1;
        }
        else {
            this.currentID = location;
        }
    };
    DesignComponent.prototype.onChangeColor = function (color) {
    };
    DesignComponent.prototype.rgbaToCmyk = function (rgba) {
        var cmyk = new Cmyk(0, 0, 0, 0);
        var k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
        if (k === 1) {
            return new Cmyk(0, 0, 0, 1);
        }
        cmyk.c = (1 - rgba.r - k) / (1 - k);
        cmyk.m = (1 - rgba.g - k) / (1 - k);
        cmyk.y = (1 - rgba.b - k) / (1 - k);
        cmyk.k = k;
        return cmyk;
    };
    DesignComponent.prototype.onChangeColorHex8 = function (color) {
        return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', true);
    };
    DesignComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._dragulaService.setOptions('drag-bag', {
            copy: false,
            moves: function (el, source, handle, sibling) {
                return true;
            },
            accepts: function (el, target, source, sibling) {
                return true;
            },
            direction: 'horizontal',
            copySortSource: false,
            revertOnSpill: false,
            removeOnSpill: false,
            mirrorContainer: document.body,
            ignoreInputTextSelection: true // allows users to select input text, see details below
        });
        this._dragulaService.drop.subscribe(function (value) {
            _this.onDrop(value.slice(1));
        });
        this._deviceService.getModel().subscribe(function (model) { return _this.deviceModel = model; });
    };
    DesignComponent.prototype.ngOnDestroy = function () {
        this._dragulaService.destroy('drag-bag');
    };
    DesignComponent.prototype.onDrop = function (args) {
        var el = args[0], target = args[1], source = args[2], sibling = args[3];
        var start = el.id;
        var end;
        if (sibling == null) {
            end = null;
        }
        else {
            end = sibling.id;
        }
        this._deviceService.moveTab(start, end);
    };
    DesignComponent.prototype.ngAfterViewInit = function () {
        this.imgCropperIcon.forEach(function (designImgCropper) {
            designImgCropper.cropper.setImage(designImgCropper.model.image.original, designImgCropper.model.image.bounds);
        });
        this.imgCropper.forEach(function (designImgCropper) {
            designImgCropper.cropper.setImage(designImgCropper.model.headerImage.original, designImgCropper.model.headerImage.bounds);
        });
    };
    DesignComponent.prototype.onCrop = function (bounds, tab) {
        tab.image.bounds = bounds;
        this._deviceService.setImage(tab.id, tab.image);
    };
    DesignComponent.prototype.onCropHeader = function (bounds, tab) {
        tab.headerImage.bounds = bounds;
        this._deviceService.setHeaderImage(tab.id, tab.headerImage);
    };
    __decorate([
        core_1.ViewChildren('designImgCropperIcon')
    ], DesignComponent.prototype, "imgCropperIcon", void 0);
    __decorate([
        core_1.ViewChildren('designImgCropper')
    ], DesignComponent.prototype, "imgCropper", void 0);
    DesignComponent = __decorate([
        core_1.Component({
            templateUrl: 'design.component.html',
            styleUrls: ['design.component.css'],
        })
    ], DesignComponent);
    return DesignComponent;
}());
exports.DesignComponent = DesignComponent;
