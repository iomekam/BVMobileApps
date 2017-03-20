import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ng2-tag-input';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppInfoComponent } from './app-info/app-info.component';
import { AppProfileInfoComponent } from './app-profile-info/app-profile-info.component';
import { BlogComponent } from './blog/blog.component';
import { SocialComponent } from './app-profile-info/social/social.component';
import { MusicComponent } from './app-profile-info/music/music.component';
import { VideoComponent } from './app-profile-info/video/video.component';
import {OnsenModule} from "angular2-onsenui";

import { CKEditorModule } from 'ng2-ckeditor';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild([
          { path: 'app-info', component: AppInfoComponent },
          {
              path: 'app-profile-info', component: AppProfileInfoComponent,
              children: [
                  {
                      path: '',
                      component: SocialComponent,
                      outlet: 'social',
                  },
                  {
                      path: '',
                      component: VideoComponent,
                      outlet: 'video',
                  },
                  {
                      path: '',
                      component: MusicComponent,
                      outlet: 'music',
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
      ]),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TagInputModule,
      CKEditorModule,
      OnsenModule,
    ],
  declarations: [
      AppInfoComponent,
      AppProfileInfoComponent,
      BlogComponent,
      SocialComponent,
      MusicComponent,
      VideoComponent,
      BlogCreateComponent,
      BlogListComponent,
  ],
  exports: [
      AppInfoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],

})
export class ProfileInfoModule { }
