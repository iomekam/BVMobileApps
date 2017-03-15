import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './app.component'

import { ProfileRegistrationModule } from '../profileRegistration/profile-registration.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ]),
        ProfileRegistrationModule,
        SharedModule
    ],
    providers: [
    ]
})
export class AppModule { }
