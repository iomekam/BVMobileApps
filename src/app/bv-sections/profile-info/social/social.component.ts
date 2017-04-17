import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfileModel, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service';
import { ValidationService } from '../../shared/validation.service';

@Component({
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent implements OnInit, OnDestroy {

    public profile: IProfileModel;

    private displayArray: Array<IMediaInfo>;

    public checked = false;

    constructor(
        private _profileService: MediaUpdateService,
        private _validationService: ValidationService) {
    }

    ngOnInit(): void {
        this._profileService.getProfile().subscribe(
            profile => {
                this.profile = profile;
                this.displayArray = this.profile.socialInfo;
            }
        );
    }

    ngOnDestroy(): void {

        this.profile.socialInfo = this.displayArray;
        this._profileService.setProfile(this.profile);
    }

    onInput(): void {
        this._validationService.setProfileInfoPageValid(this.profile);
    }

    onChecked(event: any): void {
        if (this.checked) {
            this.profile.website = "www.bvmobileapps.com/username";
        }
        else {
            this.profile.website = "";
        }

        this._validationService.setProfileInfoPageValid(this.profile);
    }
}
