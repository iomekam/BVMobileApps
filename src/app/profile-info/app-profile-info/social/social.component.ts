import { Component, OnInit } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';

@Component({
  selector: 'bv-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent implements OnInit {
    private _mediaTypes: MediaType[] = [
        MediaType.FACEBOOK,
        MediaType.TWITTER,
        MediaType.INSTAGRAM,
        MediaType.PERISCOPE,
    ];

    private contentArray: Array<IMediaInfo>;

    constructor() {
    }

    ngOnInit(): void {
        this.contentArray = [];

        this._mediaTypes.forEach(
            mediaType => {
                let mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                this.contentArray.push(mediaInfo);
            }
        );
    }
}
