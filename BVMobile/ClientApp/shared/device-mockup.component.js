"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var DeviceMockupComponent = (function () {
    function DeviceMockupComponent() {
    }
    return DeviceMockupComponent;
}());
DeviceMockupComponent = __decorate([
    core_1.Component({
        selector: 'devicem',
        template: require('./device-mockup.component.html'),
        styles: [require('./device-mockup.component.css')]
    })
], DeviceMockupComponent);
exports.DeviceMockupComponent = DeviceMockupComponent;
//# sourceMappingURL=device-mockup.component.js.map