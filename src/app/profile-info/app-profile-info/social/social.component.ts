import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service'

@Component({
  selector: 'bv-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})

export class SocialComponent implements OnInit, OnDestroy {
    private _mediaTypes: MediaType[] = [
        MediaType.FACEBOOK,
        MediaType.TWITTER,
        MediaType.INSTAGRAM,
        MediaType.PERISCOPE,
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
        this.displayArray = this.profile.socialInfo;

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
