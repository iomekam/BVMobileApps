import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProfileInfoModule } from '../profile-info/profile-info.module'

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppInfoComponent } from '../profile-info/app-info/app-info.component';
import { InputPageComponent } from './input-page.component';

import { HeaderComponent } from './header/header.component';
import { OnsenModule } from "angular2-onsenui";

import {SuiModule} from 'ng2-semantic-ui';

import { ColorPickerModule } from 'angular2-color-picker';


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
      OnsenModule,
      SuiModule,
      ColorPickerModule
  ],
  declarations: [
      InputPageComponent,
      HeaderComponent,
  ],
  exports: [
      InputPageComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
})
export class InputPageModule { }
