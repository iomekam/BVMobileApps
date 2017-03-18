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

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild([
          { path: 'app-info', component: AppInfoComponent },
          { path: 'app-profile-info', component: AppProfileInfoComponent },
          { path: 'app-blog', component: BlogComponent },
      ]),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TagInputModule,
    ],
  declarations: [
      AppInfoComponent,
      AppProfileInfoComponent,
      BlogComponent,
  ],
  exports: [
      AppInfoComponent,    
  ]
})
export class ProfileInfoModule { }
