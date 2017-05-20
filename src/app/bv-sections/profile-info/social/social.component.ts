import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfileModel, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service';
import { ValidationService } from '../../shared/validation.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent implements OnInit, OnDestroy {

    public profile: IProfileModel;

    private displayArray: Array<IMediaInfo>;

    constructor(
        private _profileService: MediaUpdateService,
        private _validationService: ValidationService,
        private _sharedService: SharedService) {
    }

    ngOnInit(): void {
        this.profile = this._profileService.getProfile();
        this.displayArray = this.profile.socialInfo;
    }

    ngOnDestroy(): void {

        this.profile.socialInfo = this.displayArray;
        this._profileService.setProfile(this.profile);
    }

    onInput(): void {
        this._validationService.setProfileInfoPageValid(this.profile);
    }

    onChecked(event: any): void {
        if (this.profile.noWebsite) {
            this.profile.website = 'www.bvmobileapps.com/' + this._sharedService.username;
        }
        else {
            this.profile.website = '';
        }

        this._validationService.setProfileInfoPageValid(this.profile);
    }
}
