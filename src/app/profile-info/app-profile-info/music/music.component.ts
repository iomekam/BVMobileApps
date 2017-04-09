import { Component, OnInit } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service'

@Component({
  selector: 'bv-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

    private profile: IProfileModel;
    private contentArray: Array<IMediaInfo>;
    private displayArray: Array<IMediaInfo>;

    constructor(private _profileService: MediaUpdateService) {
    }

    ngOnInit(): void {
        this.contentArray = [];

        this._profileService.getProfile().subscribe(
            profile => {
                this.profile = profile;
                this.displayArray = this.profile.musicInfo;

                this._profileService.musicMediaTypes.forEach(
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
        );
    }

    ngOnDestroy(): void {
        this.profile.musicInfo = this.displayArray;
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

    onDelete(mediaType: IMediaInfo): void {
        let index: number = this.displayArray.findIndex(
            type => {
                return type == mediaType;
            }
        );

        this.contentArray.push(this.displayArray[index]);
        this.displayArray.splice(index, 1);
    }
}
