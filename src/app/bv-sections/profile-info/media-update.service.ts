import { Injectable } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from './iprofile-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MediaUpdateService {

    _profile: IProfileModel;

    socialMediaTypes: MediaType[] = [
        MediaType.FACEBOOK,
        MediaType.TWITTER,
        MediaType.INSTAGRAM,
        MediaType.PERISCOPE,
    ];

    musicMediaTypes: MediaType[] = [
        MediaType.AUDIOMACK,
        MediaType.SOUNDCLOUD,
        MediaType.MIXCLOUD,
        MediaType.PODOMATIC,
        MediaType.BLOGTALKRADIO,
    ];

    videoMediaTypes: MediaType[] = [
        MediaType.YOUTUBE,
        MediaType.VIMEO,
        MediaType.FLICKR,
    ];

    radioMediaTypes: MediaType[] = [
        MediaType.LISTENLIVE
    ];

    constructor() {
        this._profile = {
            website: '',
            phone_number: '',
            musicInfo: this.createMediaInfoList(this.musicMediaTypes),
            videoInfo: this.createMediaInfoList(this.videoMediaTypes),
            radioInfo: this.createMediaInfoList(this.radioMediaTypes),
            socialInfo: this.createMediaInfoList(this.socialMediaTypes)
        };
    }

    // Creates a list of mediaInfo using the mediaTypes provided
    private createMediaInfoList(mediaTypes: MediaType[]): IMediaInfo[] {
        const mediaInfoList: IMediaInfo[] = [];

        mediaTypes.forEach(
            mediaType => {
                mediaInfoList.push(MediaTypeFactory.GetMediaInfo(mediaType));
            }
        );

        return mediaInfoList;
    }

    getProfile(): Observable<IProfileModel> {
        return Observable.of(this._profile);
    }

    setProfile(profile: IProfileModel): void {
        this._profile = profile;
    }

}
