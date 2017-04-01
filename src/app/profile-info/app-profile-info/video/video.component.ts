import { Component, OnInit } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';

@Component({
  selector: 'bv-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    private mainButton: Ng2FloatBtn;

    private _mediaTypes: MediaType[] = [
        MediaType.YOUTUBE,
        MediaType.VIMEO,
        MediaType.FLICKR,
    ];

    private videoMediaButtons: Array<Ng2FloatBtn>;
    private contentArray: Array<IProfileModel>;

    constructor() {
    }

    ngOnInit(): void {
        this.mainButton = {
            color: "primary",
            iconName: "add"
        }

        this.videoMediaButtons = [];
        this.createButtonsForFab();
    }

    createButtonsForFab(): void {
        this._mediaTypes.forEach(
            mediaType => {
                let mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                let ngFAB = {
                    color: "accent",
                    iconName: mediaInfo.icon,
                    onClick: () => {
                        this.onVideoFabButtonClicked(ngFAB);
                    },
                };

                this.videoMediaButtons.push(ngFAB);
            });
    }

    onVideoFabButtonClicked(ngButton: Ng2FloatBtn): void {
        let index: number = this.videoMediaButtons.findIndex(
            button => {
                return ngButton == button;
            }
        );

        this.videoMediaButtons.splice(index, 1);
    }

}
