import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {IAppInfo} from "../../app-info/iapp-info";
import {IMusicInfo} from "./IMusicInfo";
import {MusicUpdateServiceService} from "./music-update-service.service";

@Component({
  selector: 'bv-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  private readonly appNameMinCharacters: string = "We recommend strong, relevant keyword in your App Name. For example, a. Contraband – Free Mixtapes b. Fresh Radio – Hip-Hop and Soul c. Jayforce – Celebrity News d. DJ Kenny B – Chicago House ";
  private readonly appNameEmptyErrorMessage: string = "An App Name is required";

  private form: FormGroup;
  private appInfo: IMusicInfo;

  private showPeriscope = false;
  private showSoundCloud = false;
  private showMixCloud = false;

  constructor(form: FormBuilder, private _appInfoUpdateService: MusicUpdateServiceService) {
    this.form = form.group({

    })}
  ngOnInit() {
    this.appInfo = {
      appName: '',
    };
  }

  OnFocusOut(): void {
    this._appInfoUpdateService.emitChange(this.appInfo);
  }


}
