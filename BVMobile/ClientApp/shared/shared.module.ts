import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceMockupComponent } from './device-mockup.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        DeviceMockupComponent
    ],
    declarations: [
        DeviceMockupComponent
    ],
})

export class SharedModule { }