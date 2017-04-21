import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import {OnsenModule} from "angular2-onsenui";



@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild([
          { path: '', component: AppInfoComponent },
      ]),
      FormsModule,
      SharedModule,
      ProfileInfoModule,
      MaterialModule,
      OnsenModule
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
})
export class InputPageModule { }
