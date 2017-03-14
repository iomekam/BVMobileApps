import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './app.component'
import { DeviceMockupModule } from '../deviceMockup/device-mockup.module'

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        DeviceMockupModule
    ],
    providers: [
    ]
})
export class AppModule { }
