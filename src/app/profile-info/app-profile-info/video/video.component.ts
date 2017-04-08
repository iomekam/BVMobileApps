import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service'

@Component({
  selector: 'bv-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    private _mediaTypes: MediaType[] = [
        MediaType.YOUTUBE,
        MediaType.VIMEO,
        MediaType.FLICKR,
    ];

    private profile: IProfileModel;
    private contentArray: Array<IMediaInfo>;
    private displayArray: Array<IMediaInfo>;

    @ViewChild('fab') fab;

    constructor(private _profileService: MediaUpdateService) {
    }

    ngOnInit(): void {
        this.contentArray = [];

        this.profile = this._profileService.getProfile();
        this.displayArray = this.profile.videoInfo;

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

    ngAfterViewInit(): void {
        this.fab.nativeElement.showItems();
    }

    ngOnDestroy(): void {
        this.profile.videoInfo = this.displayArray;
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
