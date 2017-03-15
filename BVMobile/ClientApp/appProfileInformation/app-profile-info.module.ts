import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { RlTagInputModule } from 'angular2-tag-input';

import { AppProfileInfoComponent } from './app-profile-info.component';
import { ProfileInfoComponent } from './profile-info.component';
import { AppInfoComponent } from './app-info.component';

@NgModule({
    declarations: [
        AppProfileInfoComponent,
        ProfileInfoComponent,
        AppInfoComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: AppInfoComponent },
            { path: 'profileinfo', component: ProfileInfoComponent },
        ]),
        FormsModule,
        RlTagInputModule,
    ],
    providers: [

    ],
    exports: [
        AppProfileInfoComponent
    ]
})

export class AppProfileInformationModule { }
