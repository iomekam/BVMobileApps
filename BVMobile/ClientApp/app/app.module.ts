import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule } from '@angular2-material/icon';
import { MdIconRegistry } from '@angular2-material/icon';

import { AppComponent } from './app.component'
import { DeviceMockupModule } from '../deviceMockup/device-mockup.module'

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        MdCardModule,
        MdButtonModule,
        MdIconModule,
        DeviceMockupModule
    ],
    providers: [
        
        MdIconRegistry
    ]
})
export class AppModule { }
