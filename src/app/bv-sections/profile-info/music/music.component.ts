import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';
import { MediaUpdateService } from '../media-update.service';
import { DeviceService } from '../../device-mockup/device.service';
import { OrderType, TabID } from '../../device-mockup/i-device-model';
import { Bounds } from '../../../ng2-img-cropper';

@Component({
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit, OnDestroy {
    public profile: IProfileModel;
    private displayArray: Array<IMediaInfo>;

    constructor(
        private _profileService: MediaUpdateService,
        private _deviceService: DeviceService) {
    }

    ngOnInit(): void {
        this._profileService.getProfile().subscribe(
            profile => {
                this.profile = profile;
                this.displayArray = this.profile.musicInfo;
            }
        );
    }

    ngOnDestroy(): void {
        this.profile.musicInfo = this.displayArray;
        this._profileService.setProfile(this.profile);
        let isValid = false;

        this.displayArray.forEach(
            mediaType => {
                if (mediaType.username !== '') {
                    isValid = true;
                    return;
                }
            }
        );

        // The two cases we want to remove are:
        // 1) If the length of display array is zero
        // 2) The display array has items, but they aren't valid aka, the username hasn't been filled out
        if (this.displayArray.length === 0 || !isValid) {
            this._deviceService.removeTab(TabID.MUSIC);
        }
        else if (this.displayArray.length > 0 && !this._deviceService.isTabCreated(TabID.MUSIC)) {
            this._deviceService.addTab(
                {
                    id: TabID.MUSIC,
                    defaultIcon: 'icon ion ion-music-note',
                    title: 'Music',
                    orderType: OrderType.ANY,
                    order: 1,
                    showTitle: true,
                    image: {
                        original: new Image(),
                        image: '',
                        bounds: new Bounds()
                    },
                    showImage: false,
                    headerImage: {
                        original: new Image(),
                        image: '',
                        bounds: new Bounds()
                    },
                    showHeader: false
                }
            );
        }
    }
}
