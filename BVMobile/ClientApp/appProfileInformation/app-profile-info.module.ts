import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppProfileInfoComponent } from './app-profile-info.component';
import { AppInfoComponent } from './app-info.component';

@NgModule({
    declarations: [
        AppProfileInfoComponent,
        AppInfoComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: AppInfoComponent },
        ]),
    ],
    providers: [

    ],
    exports: [
        AppProfileInfoComponent
    ]
})

export class AppProfileInformationModule { }
