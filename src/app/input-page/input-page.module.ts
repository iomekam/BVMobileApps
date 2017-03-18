import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileInfoModule } from '../profile-info/profile-info.module'

import { MaterialModule, MdIconRegistry } from '@angular/material';
import 'hammerjs';

import { AppInfoComponent } from '../profile-info/app-info/app-info.component';
import { InputPageComponent } from './input-page.component';

import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild([
          { path: '', component: AppInfoComponent },
          { path: 'app-info', component: AppInfoComponent },
          { path: 'app-profile-info', component: AppInfoComponent },
          { path: 'app-blog', component: AppInfoComponent },
      ]),
      FormsModule,
      SharedModule,
      ProfileInfoModule,
      MaterialModule,
  ],
  declarations: [
      InputPageComponent,
      HeaderComponent,
  ],
  exports: [
      InputPageComponent,
  ],
  providers: [
      MdIconRegistry,
  ]
})
export class InputPageModule { }
