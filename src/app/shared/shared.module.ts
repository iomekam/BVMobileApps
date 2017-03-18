import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceMockupComponent } from './device-mockup/device-mockup.component';

@NgModule({
  imports: [
      CommonModule,
  ],
  declarations: [
      DeviceMockupComponent,
  ],
  exports: [
      DeviceMockupComponent,
  ]
})
export class SharedModule { }
