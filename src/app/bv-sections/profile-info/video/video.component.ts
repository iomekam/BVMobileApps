import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service';
import { DeviceService } from '../../device-mockup/device.service';
import { OrderType, TabID } from '../../device-mockup/i-device-model';
import { Bounds } from '../../../ng2-img-cropper';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {

    public profile: IProfileModel;
    private displayArray: Array<IMediaInfo>;

    constructor(
        private _profileService: MediaUpdateService,
        private _deviceService: DeviceService) {

    }

    ngOnInit(): void {
        this.profile = this._profileService.getProfile();
        this.displayArray = this.profile.videoInfo;
    }

    ngOnDestroy(): void {
        this.profile.videoInfo = this.displayArray;
        this._profileService.setProfile(this.profile);

        let isValid = false;

        this.displayArray.forEach(
            mediaType => {
                // YouTube is required for the video tab to show up in device-mockup
                if (mediaType.username !== null && mediaType.username !== '' && mediaType.mediaType === MediaType.YOUTUBE) {
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
            this._deviceService.addTab(TabID.VIDEO);
        }
    }
}
