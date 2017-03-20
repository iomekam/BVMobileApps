"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HeaderComponent = (function () {
    function HeaderComponent(_router) {
        this._router = _router;
        this.appInfoID = 0;
        this.profileInfoID = 1;
        this.blogInfoID = 2;
        this.isAppInfoCurrent = true;
        this.isProfileInfoCurrent = false;
        this.isBlogCurrent = false;
        this.currentChanged = new core_1.EventEmitter();
    }
    HeaderComponent.prototype.toggleCurrent = function (id) {
        if (isNaN(id)) {
            return;
        }
        this.clearCurrent();
        if (id == this.appInfoID) {
            this.isAppInfoCurrent = true;
            this.currentID = this.appInfoID;
        }
        else if (id == this.profileInfoID) {
            this.isProfileInfoCurrent = true;
            this.currentID = this.profileInfoID;
        }
        else if (id == this.blogInfoID) {
            this.isBlogCurrent = true;
            this.currentID = this.blogInfoID;
        }
        this.currentChanged.emit(this.currentID);
    };
    HeaderComponent.prototype.clearCurrent = function () {
        this.isAppInfoCurrent = false;
        this.isProfileInfoCurrent = false;
        this.isBlogCurrent = false;
    };
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.ngOnChanges = function () {
        this.toggleCurrent(this.currentID);
        if (this.currentID == this.appInfoID) {
            this._router.navigate(['/app-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.profileInfoID) {
            this._router.navigate(['/app-profile-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.blogInfoID) {
            this._router.navigate(['/app-blog'], { skipLocationChange: true });
        }
    };
    __decorate([
        core_1.Input("current")
    ], HeaderComponent.prototype, "currentID", void 0);
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "currentChanged", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'bv-input-page-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
