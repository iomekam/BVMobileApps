import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service';
import { DeviceService } from '../../device-mockup/device.service';
import { OrderType, TabID } from '../../device-mockup/i-device-model';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {

    public profile: IProfileModel;

    // contentArray represents the elements that appear inside the ons-speed-dial
    public contentArray: Array<IMediaInfo>;

    // displayArray are the media info that appear on screen. As elements get added/removed from this list, they
    // get removed/added to the contentArray list
    private displayArray: Array<IMediaInfo>;

    constructor(
        private _profileService: MediaUpdateService,
        private _deviceService: DeviceService) {

    }

    ngOnInit(): void {
        // We always want to start off with a null contentArray
        this.contentArray = [];

        this._profileService.getProfile().subscribe(
            profile => {
                this.profile = profile;
                this.displayArray = this.profile.videoInfo;

                // We only want to have elements not in the display array be added to the content array
                this._profileService.videoMediaTypes.forEach(
                    mediaType => {
                        const shouldAddToContent = this.displayArray.find(
                            content => {
                                return content.mediaType === mediaType;
                            }
                        ) === undefined;

                        // shouldAddToContent will be undefined if the mediaType was not found in the displayArray
                        if (!shouldAddToContent) { return; }

                        const mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                        this.contentArray.push(mediaInfo);
                    }
                );
            }
        );
    }

    ngOnDestroy(): void {
        this.profile.videoInfo = this.displayArray;
        this._profileService.setProfile(this.profile);

        let isValid = false;

        this.displayArray.forEach(
            mediaType => {
                if (mediaType.username !== '' && mediaType.mediaType === MediaType.YOUTUBE) {
                    isValid = true;
                    return;
                }
            }
        );

        // The two cases we want to remove are:
        // 1) If the length of display array is zero
        // 2) The display array has items, but they aren't valid aka, the username hasn't been filled out
        if (this.displayArray.length === 0 || !isValid) {
            this._deviceService.removeTab(TabID.VIDEO);
        }
        else if (this.displayArray.length > 0 && !this._deviceService.isTabCreated(TabID.VIDEO)) {
            this._deviceService.addTab(
                {
                    id: TabID.VIDEO,
                    defaultIcon: 'icon ion ion-videocamera',
                    title: 'Video',
                    orderType: OrderType.ANY,
                    order: 1,
                    showTitle: true,
                    image: '',
                    showImage: false,
                    headerImage: '',
                    showHeader: false
                }
            );
        }
    }

    onFabClicked(mediaType: IMediaInfo): void {
        const index: number = this.contentArray.findIndex(
            type => {
                return type === mediaType;
            }
        );

        if (index === -1) { return; }

        this.displayArray.push(this.contentArray[index]);
        this.contentArray.splice(index, 1);
    }

    onDelete(mediaType: IMediaInfo): void {
        const index: number = this.displayArray.findIndex(
            type => {
                return type === mediaType;
            }
        );

        if (index === -1) { return; }

        this.contentArray.push(this.displayArray[index]);
        this.displayArray.splice(index, 1);
    }
}
