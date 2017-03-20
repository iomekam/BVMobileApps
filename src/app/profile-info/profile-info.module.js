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
var ng2_tag_input_1 = require('ng2-tag-input');
var material_1 = require('@angular/material');
require('hammerjs');
var app_info_component_1 = require('./app-info/app-info.component');
var app_profile_info_component_1 = require('./app-profile-info/app-profile-info.component');
var blog_component_1 = require('./blog/blog.component');
var social_component_1 = require('./app-profile-info/social/social.component');
var music_component_1 = require('./app-profile-info/music/music.component');
var video_component_1 = require('./app-profile-info/video/video.component');
var ProfileInfoModule = (function () {
    function ProfileInfoModule() {
    }
    ProfileInfoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forChild([
                    { path: 'app-info', component: app_info_component_1.AppInfoComponent },
                    {
                        path: 'app-profile-info', component: app_profile_info_component_1.AppProfileInfoComponent,
                        children: [
                            {
                                path: '',
                                component: social_component_1.SocialComponent,
                                outlet: 'social',
                            },
                            {
                                path: '',
                                component: video_component_1.VideoComponent,
                                outlet: 'video',
                            },
                            {
                                path: '',
                                component: music_component_1.MusicComponent,
                                outlet: 'music',
                            },
                        ],
                    },
                    { path: 'app-blog', component: blog_component_1.BlogComponent },
                ]),
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MaterialModule,
                ng2_tag_input_1.TagInputModule,
            ],
            declarations: [
                app_info_component_1.AppInfoComponent,
                app_profile_info_component_1.AppProfileInfoComponent,
                blog_component_1.BlogComponent,
                social_component_1.SocialComponent,
                music_component_1.MusicComponent,
                video_component_1.VideoComponent,
            ],
            exports: [
                app_info_component_1.AppInfoComponent,
            ]
        })
    ], ProfileInfoModule);
    return ProfileInfoModule;
}());
exports.ProfileInfoModule = ProfileInfoModule;
