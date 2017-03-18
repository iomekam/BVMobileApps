﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ng2-tag-input';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppInfoComponent } from './app-info/app-info.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild([
          { path: 'noop', component: AppInfoComponent },
      ]),
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      TagInputModule,
    ],
  declarations: [
      AppInfoComponent,
  ],
  exports: [
      AppInfoComponent,    
  ]
})
export class ProfileInfoModule { }
