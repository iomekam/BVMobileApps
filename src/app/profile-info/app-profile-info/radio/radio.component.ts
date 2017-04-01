import { Component, OnInit } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service'

@Component({
  selector: 'bv-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
    private _mediaTypes: MediaType[] = [
        MediaType.LISTENLIVE
    ];

    private profile: IProfileModel;
    private contentArray: Array<IMediaInfo>;
    private displayArray: Array<IMediaInfo>;

    constructor(private _profileService: MediaUpdateService) {
    }

    ngOnInit(): void {
        this.contentArray = [];

        this.profile = this._profileService.getProfile();
        this.displayArray = this.profile.radioInfo;

        this._mediaTypes.forEach(
            mediaType => {
                let shouldAddToContent = this.displayArray.find(
                    content => {
                        return content.mediaType == mediaType;
                    }
                ) === undefined;

                if (!shouldAddToContent) { return; }

                let mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                this.contentArray.push(mediaInfo);
            }
        );
    }

    ngOnDestroy(): void {
        this.profile.socialInfo = this.displayArray;
        this._profileService.setProfile(this.profile);
    }

    onFabClicked(mediaType: IMediaInfo): void {
        let index: number = this.contentArray.findIndex(
            type => {
                return type == mediaType;
            }
        );

        this.displayArray.push(this.contentArray[index]);
        this.contentArray.splice(index, 1);
    }
}
