import { NgModule } from '@angular/core';
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

import { CKEditorModule } from 'ng2-ckeditor';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

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
          { path: 'app-blog', component: BlogComponent },
      ]),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TagInputModule,
      CKEditorModule,
    ],
  declarations: [
      AppInfoComponent,
      AppProfileInfoComponent,
      BlogComponent,
      SocialComponent,
      MusicComponent,
      VideoComponent,
      ImageCropperComponent
  ],
  exports: [
      AppInfoComponent,    
  ]
})
export class ProfileInfoModule { }
