import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceMockupComponent } from './device-mockup/device-mockup.component';
import {OnsenModule} from "angular2-onsenui";

@NgModule({
  imports: [
      CommonModule,
    OnsenModule
  ],
  declarations: [
      DeviceMockupComponent,
  ],
  exports: [
      DeviceMockupComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
})
export class SharedModule { }
