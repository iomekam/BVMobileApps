"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var shared_module_1 = require("../shared/shared.module");
var app_profile_info_module_1 = require("../appProfileInformation/app-profile-info.module");
var profile_registration_component_1 = require("./profile-registration.component");
var header_component_1 = require("./header.component");
var ProfileRegistrationModule = (function () {
    function ProfileRegistrationModule() {
    }
    return ProfileRegistrationModule;
}());
ProfileRegistrationModule = __decorate([
    core_1.NgModule({
        declarations: [
            profile_registration_component_1.ProfileRegistrationComponent,
            header_component_1.ProfileRegistrationHeader
        ],
        imports: [
            router_1.RouterModule,
            shared_module_1.SharedModule,
            app_profile_info_module_1.AppProfileInformationModule
        ],
        providers: [],
        exports: [
            profile_registration_component_1.ProfileRegistrationComponent
        ]
    })
], ProfileRegistrationModule);
exports.ProfileRegistrationModule = ProfileRegistrationModule;
//# sourceMappingURL=profile-registration.module.js.map