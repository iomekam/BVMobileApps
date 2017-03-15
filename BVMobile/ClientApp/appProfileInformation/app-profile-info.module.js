"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_profile_info_component_1 = require("./app-profile-info.component");
var app_info_component_1 = require("./app-info.component");
var AppProfileInformationModule = (function () {
    function AppProfileInformationModule() {
    }
    return AppProfileInformationModule;
}());
AppProfileInformationModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_profile_info_component_1.AppProfileInfoComponent,
            app_info_component_1.AppInfoComponent
        ],
        imports: [
            router_1.RouterModule.forChild([
                { path: '', component: app_info_component_1.AppInfoComponent },
            ]),
        ],
        providers: [],
        exports: [
            app_profile_info_component_1.AppProfileInfoComponent
        ]
    })
], AppProfileInformationModule);
exports.AppProfileInformationModule = AppProfileInformationModule;
//# sourceMappingURL=app-profile-info.module.js.map