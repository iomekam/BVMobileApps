import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../shared/validation.service';

@Component({
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit {

    private isValid: boolean;

    constructor(
      private _headerService: HeaderService,
      private _validationService: ValidationService) {
    }

    ngOnInit() {
      this.isValid = this._validationService.getProfileInfoPageValid();
      this._validationService.isProfileInfoPageValid$.subscribe(
        isValid => this.isValid = isValid
      );
    }
}
