import { Injectable } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from './iprofile-model';

@Injectable()
export class MediaUpdateService {

    _profile: IProfileModel;

    socialMediaTypes: MediaType[] = [
        MediaType.FACEBOOK,
        MediaType.TWITTER,
        MediaType.INSTAGRAM,
        MediaType.PERISCOPE,
    ];

    constructor() {
        this._profile = {
            website: "",
            phone_number: "",
            musicInfo: [],
            videoInfo: [],
            radioInfo: [],
            socialInfo: this.createMediaInfoList(this.socialMediaTypes)
        };
    }

    private createMediaInfoList(mediaTypes: MediaType[]): IMediaInfo[] {
        let mediaInfoList: IMediaInfo[] = [];

        mediaTypes.forEach(
            mediaType => {
                mediaInfoList.push(MediaTypeFactory.GetMediaInfo(mediaType));
            }
        );

        return mediaInfoList;
    }

    getProfile(): IProfileModel {
        return this._profile;
    }

    setProfile(profile: IProfileModel): void {
        this._profile = profile;
    }

}
