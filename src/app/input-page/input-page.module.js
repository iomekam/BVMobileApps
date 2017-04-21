"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var shared_module_1 = require('../shared/shared.module');
var profile_info_module_1 = require('../profile-info/profile-info.module');
var material_1 = require('@angular/material');
require('hammerjs');
var app_info_component_1 = require('../profile-info/app-info/app-info.component');
var input_page_component_1 = require('./input-page.component');
var header_component_1 = require('./header/header.component');
var InputPageModule = (function () {
    function InputPageModule() {
    }
    InputPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: '', component: app_info_component_1.AppInfoComponent },
                ]),
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                profile_info_module_1.ProfileInfoModule,
                material_1.MaterialModule,
            ],
            declarations: [
                input_page_component_1.InputPageComponent,
                header_component_1.HeaderComponent,
            ],
            exports: [
                input_page_component_1.InputPageComponent,
            ],
            providers: [
                material_1.MdIconRegistry,
            ]
        })
    ], InputPageModule);
    return InputPageModule;
}());
exports.InputPageModule = InputPageModule;
