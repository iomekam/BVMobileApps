import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {SocialUpdateServiceService} from "./social-update-service.service";
import {ISocialInfo} from "./ISocialInfo";

@Component({
  selector: 'bv-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  private readonly appNameMinCharacters: string = "We recommend strong, relevant keyword in your App Name. For example, a. Contraband – Free Mixtapes b. Fresh Radio – Hip-Hop and Soul c. Jayforce – Celebrity News d. DJ Kenny B – Chicago House ";
  private readonly appNameEmptyErrorMessage: string = "An App Name is required";


  private form: FormGroup;
  private appInfo: ISocialInfo;


  private showPeriscope: boolean = false;
  private showSoundCloud: boolean = false;
  private showMixCloud: boolean = false;

  constructor(form: FormBuilder, private _appInfoUpdateService: SocialUpdateServiceService) {
    this.form = form.group({

    })

  }
  ngOnInit() {
    this.appInfo = {
      appName: '',
    };
  }

}
