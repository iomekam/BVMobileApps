import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../shared/validation.service';
import { PageLoadingService, BVPages } from '../shared/page-loading.service';

@Component({
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit {

    private isValid: boolean;

    constructor(
      private _headerService: HeaderService,
      private _validationService: ValidationService,
      private _pageValidation: PageLoadingService) {
    }

    ngOnInit() {
      this._pageValidation.savePage(BVPages.PROFILE_INFO);

      this.isValid = this._validationService.getProfileInfoPageValid();
      this._validationService.isProfileInfoPageValid$.subscribe(
        isValid => this.isValid = isValid
      );
    }
}
