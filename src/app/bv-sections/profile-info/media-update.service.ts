import { Injectable } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from './iprofile-model';
import { Observable } from 'rxjs/Observable';
import { Bounds } from '../../ng2-img-cropper';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';

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

    private _url = 'http://localhost:7345/api/profileInfo/1';

    private ngUnsubscribe = new Subject<void>();
    private httpPutUnsubscribe = new Subject<void>();

    private _profileInit = new Subject<IProfileModel>();
    private _init = false;

    constructor(private _http: Http) {
        this._profile = {
            website: '',
            noWebsite: false,
            phone_number: '',
            musicInfo: this.createMediaInfoList(this.musicMediaTypes),
            videoInfo: this.createMediaInfoList(this.videoMediaTypes),
            radioInfo: this.createMediaInfoList(this.radioMediaTypes),
            socialInfo: this.createMediaInfoList(this.socialMediaTypes)
        };

        this.init().takeUntil(this.ngUnsubscribe)
            .subscribe(
                profile => {
                    this._profile = profile;
                    this._init = true;
                    this._profileInit.next(this._profile);
                    this.ngUnsubscribe.next();
                    this.ngUnsubscribe.complete();
            }
        );
    }

    private init(): Observable<IProfileModel> {
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

    getProfile(): Observable<IProfileModel> {
        if (!this._init) {
            this._profileInit.next(this._profile);
            return this._profileInit.asObservable();
        }
        else {
            return Observable.of(this._profile);
        }
    }

    setProfile(profile: IProfileModel): void {
        this._profile = profile;

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
