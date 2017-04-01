import { Component, OnInit } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';

@Component({
  selector: 'bv-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent implements OnInit {
    private mainButton: Ng2FloatBtn;

    private _mediaTypes: MediaType[] = [
        MediaType.FACEBOOK,
        MediaType.TWITTER,
        MediaType.INSTAGRAM,
        MediaType.PERISCOPE,
    ];

    private socialMediaButtons: Array<Ng2FloatBtn>;
    private contentArray: Array<IProfileModel>;

    constructor() {
    }

    ngOnInit(): void {

    }

    createButtonsForFab(): void {
        this._mediaTypes.forEach(function (mediaType: MediaType) {
            let mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
            let ngFAB = {
                color: "primary",
                iconName: mediaInfo.icon,
                onClick: () => {
                    this.onSocialFabButtonClicked(mediaInfo.mediaType);
                }
            };

            this.socialMediaButtons.push(ngFAB);
        });
    }

    onSocialFabButtonClicked(mediaType: MediaType): void {

    }

}
