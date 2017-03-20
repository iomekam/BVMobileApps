import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPageModule } from './input-page/input-page.module';

import { AppComponent } from './app.component';

import { BlogPostService } from './profile-info/blog/blog-post.service';
import { AppInfoService } from './profile-info/app-info/app-info.service';

import "materialize-css";
import "angular2-materialize";

import { MaterializeModule } from "angular2-materialize";
import { OnsenModule } from "angular2-onsenui";
import { SocialUpdateServiceService } from "./profile-info/app-profile-info/social/social-update-service.service";
import { MusicUpdateServiceService } from "./profile-info/app-profile-info/music/music-update-service.service";

@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterializeModule,
      RouterModule.forRoot([
          { path: '', redirectTo: '', pathMatch: 'full' },
          { path: '**', redirectTo: '', pathMatch: 'full' }
      ]),
      InputPageModule,
      OnsenModule,
    ],
  providers: [
      BlogPostService,
      AppInfoService,
      SocialUpdateServiceService,
      MusicUpdateServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
