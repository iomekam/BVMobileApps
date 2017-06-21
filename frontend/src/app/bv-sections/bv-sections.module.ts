import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RlTagInputModule } from 'angular2-tag-input';
import { TagInputModule } from 'ng2-tag-input';
import { MaterialModule } from '@angular/material';

import { CKEditorModule } from 'ng2-ckeditor';

import { OnsenModule } from 'angular2-onsenui';
import { ImageCropperModule } from '../ng2-img-cropper';
import { SuiModule } from 'ng2-semantic-ui';
import { ColorPickerModule } from 'angular2-color-picker';
import { Ng2FloatBtnModule } from 'ng2-float-btn';

import { AppInfoComponent } from './app-info/app-info.component';
import { DeviceMockupComponent } from './device-mockup/device-mockup.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { SocialComponent } from './profile-info/social/social.component';
import { MusicComponent } from './profile-info/music/music.component';
import { VideoComponent } from './profile-info/video/video.component';
import { RadioComponent } from './profile-info/radio/radio.component';
import { BlogComponent } from './blog/blog.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { DesignComponent } from './design/design.component';
import { DragulaModule } from 'ng2-dragula';
import { MyPopoverComponent } from './design/MyPopoverComponent';
import { DesignImageCropperComponent } from './design/design-image-cropper/design-image-cropper.component';
import { LoadpageGuard } from './loadpage.guard';
import { FilterPipe } from './device-mockup/device.service';
import { CreateComponent } from './create/create.component';

import { PopoverModule } from 'ngx-bootstrap/popover';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		              tokenGetter: (() => localStorage.getItem('token')),
		              globalHeaders: [{'Content-Type':'application/json'}],
	      }), http, options);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AppInfoComponent, canActivate: [LoadpageGuard] },
      { path: 'app-info', component: AppInfoComponent },
      {
        path: 'app-profile-info', component: ProfileInfoComponent,
        children: [
          {
              path: '',
              component: SocialComponent,
              outlet: 'social',
          },
          {
              path: '',
              component: MusicComponent,
              outlet: 'music',
          },
          {
              path: '',
              component: VideoComponent,
              outlet: 'video',
          },
          {
              path: '',
              component: RadioComponent,
              outlet: 'radio',
          },
        ],
      },
      {
          path: 'app-blog', component: BlogComponent,
          children: [
              { path: '', component: BlogListComponent, },
              { path: 'blog-list', component: BlogListComponent, },
              { path: 'blog-create', component: BlogCreateComponent, },
              { path: 'blog-create/:id', component: BlogCreateComponent, },
          ]
      },
      { path: 'design', component: DesignComponent },
      { path: 'create', component: CreateComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TagInputModule,
    CKEditorModule,
    OnsenModule,
    ImageCropperModule,
    SuiModule,
    ColorPickerModule,
    Ng2FloatBtnModule,
    RlTagInputModule,
    DragulaModule,
    PopoverModule.forRoot()
  ],
  declarations: [
    AppInfoComponent,
    DeviceMockupComponent,
    ProfileInfoComponent,
    SocialComponent,
    MusicComponent,
    VideoComponent,
    RadioComponent,
    BlogComponent,
    BlogListComponent,
    BlogCreateComponent,
    DesignComponent,
    MyPopoverComponent,
    DesignImageCropperComponent,
    FilterPipe,
    CreateComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  entryComponents: [MyPopoverComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
})
export class BvSectionsModule { }
