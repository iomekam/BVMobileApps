﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPageModule } from './input-page/input-page.module';

import { AppComponent } from './app.component';

import { AppInfoUpdateServiceService } from './profile-info/app-info/app-info-update-service.service';
import { BlogPostService } from './profile-info/blog/blog-post.service';

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
      InputPageModule
    ],
  providers: [
      AppInfoUpdateServiceService,
      BlogPostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
