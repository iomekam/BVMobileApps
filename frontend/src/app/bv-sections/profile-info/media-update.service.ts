import { Injectable } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from './iprofile-model';
import { Observable } from 'rxjs/Observable';
import { Bounds } from '../../ng2-img-cropper';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ValidationService } from '../shared/validation.service'
import { SharedService } from '../shared/shared.service';

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

    private _url = '/api/profileInfo/';

    private httpPutUnsubscribe = new Subject<void>();

    getUrl(): string {
      return this._url;
    }

    constructor(
        private _http: Http,
        private _validationService: ValidationService,
        private _sharedService: SharedService) {
        this._profile = {
            website: '',
            noWebsite: false,
            phone_number: '',
            musicInfo: this.createMediaInfoList(this.musicMediaTypes),
            videoInfo: this.createMediaInfoList(this.videoMediaTypes),
            radioInfo: this.createMediaInfoList(this.radioMediaTypes),
            socialInfo: this.createMediaInfoList(this.socialMediaTypes)
        };
    }

    public setDataAfterFetch(profile: IProfileModel) {
        this._profile = profile;

        if (profile.website.includes("www.bvmobileapps.com")) {
            this._profile.noWebsite = true;
        }

        this._validationService.setProfileInfoPageValid(this.isValid());
     }

    public fetchData() : Observable<IProfileModel> {
        return this.init();
    }

    public isValid(): boolean {
        return this._profile.website !== '';
    }

    private init(): Observable<IProfileModel> {
        if(this._sharedService.isOfflineMode()) {
            return;
        }

        this._url = this._sharedService.url + this._url + this._sharedService.id;
        return this._http.get(this._url)
            .map((response: Response) => <IProfileModel> response.json())
            .do(data => {
                data.noWebsite = false;
                data.socialInfo = this.createMediaInfoListWithMediaInfo(this.socialMediaTypes, data.socialInfo);
                data.musicInfo = this.createMediaInfoListWithMediaInfo(this.musicMediaTypes, data.musicInfo);
                data.videoInfo = this.createMediaInfoListWithMediaInfo(this.videoMediaTypes, data.videoInfo);
                data.radioInfo = this.createMediaInfoListWithMediaInfo(this.radioMediaTypes, data.radioInfo);
            });
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

    // Creates a list of mediaInfo using the mediaTypes provided
    private createMediaInfoListWithMediaInfo(mediaTypes: MediaType[], mediaInfoList: IMediaInfo[]): IMediaInfo[] {
        const newMediaInfoList: IMediaInfo[] = [];
        mediaTypes.forEach(
            mediaType => {
                
                const index = mediaInfoList.findIndex(
                    info => {
                        return mediaType === info.mediaType;
                    }
                );
                
                if (index === -1) { return; }

                const mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                mediaInfo.username = mediaInfoList[index].username;
                newMediaInfoList.push(mediaInfo);
            }
        );

        return newMediaInfoList;
    }

    getProfile() {
        return this._profile;
    }

    setProfile(profile: IProfileModel): void {
        this._profile = profile;

        if(this._sharedService.isOfflineMode()) {
            return;
        }

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const options = new RequestOptions({ headers: headers });
        this._http.put(this._url, JSON.stringify(this._profile), options)
                .takeUntil(this.httpPutUnsubscribe)
                .subscribe(
                    data => {
                        this.httpPutUnsubscribe.next();
                        this.httpPutUnsubscribe.complete();
                    },
                    error => console.log(JSON.stringify(error))
        );
    }

}
