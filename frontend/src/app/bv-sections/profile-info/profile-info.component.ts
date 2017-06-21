import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../shared/validation.service';
import { PageLoadingService, BVPages } from '../shared/page-loading.service';
import { IProfileModel } from './iprofile-model';
import { MediaUpdateService } from './media-update.service';
import { Subject } from 'rxjs/Subject';

@Component({
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit, OnDestroy {

    private isValid: boolean;
    private _profile: IProfileModel;
    private validUnsub = new Subject<void>();

    constructor(
      private _headerService: HeaderService,
      private _validationService: ValidationService,
      private _pageValidation: PageLoadingService,
      private _profileService: MediaUpdateService) {
    }

    ngOnInit() {
      this._pageValidation.savePage(BVPages.PROFILE_INFO);

      this.isValid = this._validationService.getProfileInfoPageValid();
      this._validationService.isProfileInfoPageValid$.takeUntil(this.validUnsub).subscribe(
        isValid => this.isValid = isValid
      );

      this._profile = this._profileService.getProfile();
    }

    ngOnDestroy() {
      this.validUnsub.next();
      this.validUnsub.complete();

      this._profileService.setProfile(this._profileService.getProfile());
    }

    @HostListener('window:beforeunload')
    onRefresh() {
      let xhr = new XMLHttpRequest()

      xhr.open("PUT", this._profileService.getUrl(), false);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
      xhr.send(JSON.stringify(this._profile));
    }
}
