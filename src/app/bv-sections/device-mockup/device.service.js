"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var i_device_model_1 = require('./i-device-model');
var Observable_1 = require('rxjs/Observable');
var ng2_img_cropper_1 = require('../../ng2-img-cropper');
var DeviceService = (function () {
    function DeviceService() {
        this._photo = {
            id: i_device_model_1.TabID.PHOTO,
            title: 'Photos',
            orderType: i_device_model_1.OrderType.ANY,
            order: 2,
            defaultIcon: 'icon ion ion-camera',
            image: {
                original: new Image(),
                image: '',
                bounds: new ng2_img_cropper_1.Bounds()
            },
            showTitle: true,
            showImage: false,
            headerImage: {
                original: new Image(),
                image: '',
                bounds: new ng2_img_cropper_1.Bounds()
            },
            showHeader: false
        };
        this._model = {
            appName: '',
            colors: {
                primary: '#000000',
                secondary: '#0099ff'
            },
            tabs: [
                {
                    id: i_device_model_1.TabID.BLOG,
                    title: 'Main',
                    orderType: i_device_model_1.OrderType.FIRST,
                    order: -1,
                    defaultIcon: 'icon ion ion-home',
                    image: {
                        original: new Image(),
                        image: '',
                        bounds: new ng2_img_cropper_1.Bounds()
                    },
                    showTitle: true,
                    showImage: false,
                    headerImage: {
                        original: new Image(),
                        image: '',
                        bounds: new ng2_img_cropper_1.Bounds()
                    },
                    showHeader: false
                },
                this._photo,
                {
                    id: i_device_model_1.TabID.MORE,
                    title: 'More',
                    orderType: i_device_model_1.OrderType.LAST,
                    order: 5,
                    defaultIcon: 'icon ion ion-more',
                    image: {
                        original: new Image(),
                        image: '',
                        bounds: new ng2_img_cropper_1.Bounds()
                    },
                    showTitle: true,
                    showImage: false,
                    headerImage: {
                        original: new Image(),
                        image: '',
                        bounds: new ng2_img_cropper_1.Bounds()
                    },
                    showHeader: false
                },
            ],
            activeTab: null
        };
    }
    DeviceService.prototype.getDefaultModel = function () {
        return this._model;
    };
    DeviceService.prototype.getModel = function () {
        return Observable_1.Observable.of(this._model);
    };
    DeviceService.prototype.setAppName = function (name) {
        this._model.appName = name;
    };
    DeviceService.prototype.addTab = function (tab) {
        // If all 5 tabs are already being shown, then we want to replace the photo tab with the radio tab.
        if (this._model.tabs.length === 5) {
            this.removeTab(i_device_model_1.TabID.PHOTO);
        }
        this._model.tabs.splice(this._model.tabs.length - 2, 0, tab);
    };
    DeviceService.prototype.removeTab = function (id) {
        // If we are removing a tab (not Photos), then we can restore the photo tab
        if (this._model.tabs.length === 5 && id !== i_device_model_1.TabID.PHOTO) {
            this.addTab(this._photo);
        }
        var index = this._model.tabs.findIndex(function (tab) {
            return id === tab.id;
        });
        if (index === -1) {
            return;
        }
        this._model.tabs.splice(index, 1);
    };
    DeviceService.prototype.isTabCreated = function (id) {
        var index = this._model.tabs.findIndex(function (tab) {
            return id === tab.id;
        });
        return index !== -1;
    };
    DeviceService.prototype.setPrimaryColor = function (color) {
        this._model.colors['primary'] = color;
    };
    DeviceService.prototype.setImage = function (id, image) {
        var index = this._model.tabs.findIndex(function (tab) {
            return (id + '') === (tab.id + '');
        });
        if (index === -1) {
            return;
        }
        this._model.tabs[index].image = image;
        this._model.tabs[index].showImage = true;
    };
    DeviceService.prototype.setHeaderImage = function (id, image) {
        var index = this._model.tabs.findIndex(function (tab) {
            return (id + '') === (tab.id + '');
        });
        if (index === -1) {
            return;
        }
        this._model.tabs[index].headerImage = image;
        this._model.tabs[index].showHeader = true;
        this._model.activeTab = this._model.tabs[index];
    };
    DeviceService.prototype.moveTab = function (id, before) {
        if (this._model.tabs.length > 3 && id != null) {
            var end = void 0;
            if (before != null) {
                var indexEnd = this._model.tabs.findIndex(function (tab) {
                    return (before + '') === (tab.id + '');
                });
                end = indexEnd;
            }
            else {
                end = this._model.tabs.length - 1;
            }
            var indexStart = this._model.tabs.findIndex(function (tab) {
                return (id + '') === (tab.id + '');
            });
            var removetab = this._model.tabs[indexStart];
            if (indexStart < end) {
                this._model.tabs.splice(end, 0, removetab);
                this._model.tabs.splice(indexStart, 1);
            }
            else {
                this._model.tabs.splice(indexStart, 1);
                this._model.tabs.splice(end, 0, removetab);
            }
        }
    };
    DeviceService.prototype.setSecondaryColor = function (color) {
        this._model.colors['secondary'] = color;
    };
    DeviceService = __decorate([
        core_1.Injectable()
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
