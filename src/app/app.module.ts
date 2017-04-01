import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InputPageModule } from './input-page/input-page.module';

import { AppComponent } from './app.component';

import { BlogPostService } from './profile-info/blog/blog-post.service';
import { AppInfoService } from './profile-info/app-info/app-info.service';

import { OnsenModule } from "angular2-onsenui";

import { MdIconRegistry } from '@angular/material';

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
    ],
  providers: [
      MdIconRegistry,
      BlogPostService,
      AppInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
