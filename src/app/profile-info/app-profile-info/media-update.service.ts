import { Injectable } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from './iprofile-model';

@Injectable()
export class MediaUpdateService {

    _profile: IProfileModel;

    constructor() {
        this._profile = {
            website: "",
            phone_number: "",
            musicInfo: [],
            videoInfo: [],
            radioInfo: [],
            socialInfo: []
        };
    }

    getProfile(): IProfileModel {
        return this._profile;
    }

    setProfile(profile: IProfileModel): void {
        this._profile = profile;
    }

}
