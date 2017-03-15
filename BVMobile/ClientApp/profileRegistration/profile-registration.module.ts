import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AppProfileInformationModule } from '../appProfileInformation/app-profile-info.module';

import { ProfileRegistrationComponent } from './profile-registration.component'
import { ProfileRegistrationHeader } from './header.component'

@NgModule({
    declarations: [
        ProfileRegistrationComponent,
        ProfileRegistrationHeader
    ],
    imports: [
        RouterModule,
        SharedModule,
        AppProfileInformationModule
    ],
    providers: [

    ],
    exports: [
        ProfileRegistrationComponent
    ]
})

export class ProfileRegistrationModule { }
