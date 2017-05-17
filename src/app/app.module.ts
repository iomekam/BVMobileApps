import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { OnsenModule } from 'angular2-onsenui';

import { AppComponent } from './app.component';
import { BvSectionsModule } from './bv-sections/bv-sections.module';
import { HeaderComponent } from './header/header.component';

import { AppInfoService } from './bv-sections/app-info/app-info.service';
import { MediaUpdateService } from './bv-sections/profile-info/media-update.service';
import { BlogPostService } from './bv-sections/blog/blog-post.service';
import { DeviceService } from './bv-sections/device-mockup/device.service';
import { ValidationService } from './bv-sections/shared/validation.service';
import { HeaderService } from './header/header.service';
import { PageLoadingService } from './bv-sections/shared/page-loading.service';

import { LoadpageGuard  } from './bv-sections/loadpage.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        { path: '', redirectTo: '', pathMatch: 'full'},
        { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
    OnsenModule,
    BvSectionsModule,
  ],
  providers: [
    MdIconRegistry,
    AppInfoService,
    MediaUpdateService,
    BlogPostService,
    DeviceService,
    ValidationService,
    HeaderService,
    PageLoadingService,
    LoadpageGuard
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
    constructor(
      mdIconRegistry: MdIconRegistry, 
      sanitizer: DomSanitizer,
      private _appInfoService: AppInfoService,
      private _mediaService: MediaUpdateService,
      private _blogPostService: BlogPostService,
      private _deviceService: DeviceService,
      private _validationService: ValidationService,
      private _headerService: HeaderService) {
        mdIconRegistry.registerFontClassAlias('fontawesome', 'fa');
        _headerService.next();
    }
}
