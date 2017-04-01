import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPageModule } from './input-page/input-page.module';

import { AppComponent } from './app.component';

import { BlogPostService } from './profile-info/blog/blog-post.service';
import { AppInfoService } from './profile-info/app-info/app-info.service';

import { OnsenModule } from "angular2-onsenui";

import {SuiModule} from 'ng2-semantic-ui';
import { ColorPickerModule } from 'angular2-color-picker';
import {DesignService} from "./profile-info/design/design.service";
import {MdIconRegistry} from "@angular/material";

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot([
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: '**', redirectTo: '', pathMatch: 'full' }
      ]),
      InputPageModule,
      OnsenModule,
      SuiModule,
    ColorPickerModule
    ],
  providers: [
      MdIconRegistry,
      BlogPostService,
      AppInfoService,
      DesignService,
      SocialUpdateServiceService,
      MusicUpdateServiceService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(mdIconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
        mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    } 
}
