import { Component, OnInit } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';

@Component({
  selector: 'bv-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
    private mainButton: Ng2FloatBtn;

    private _mediaTypes: MediaType[] = [
        MediaType.LISTENLIVE
    ];

    private musicMediaButtons: Array<Ng2FloatBtn>;
    private contentArray: Array<IProfileModel>;

    constructor() {
    }

    ngOnInit(): void {
        this.mainButton = {
            color: "primary",
            iconName: "add"
        }

        this.musicMediaButtons = [];
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
                        this.onMusicFabButtonClicked(ngFAB);
                    },
                };

                this.musicMediaButtons.push(ngFAB);
            });
    }

    onMusicFabButtonClicked(ngButton: Ng2FloatBtn): void {
        let index: number = this.musicMediaButtons.findIndex(
            button => {
                return ngButton == button;
            }
        );

        this.musicMediaButtons.splice(index, 1);
    }
}
