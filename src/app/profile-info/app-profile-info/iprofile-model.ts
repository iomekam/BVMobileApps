export interface IProfileModel {
    website: string;
    phone_number: string;
    mediaInfo: IMediaInfo;
}

export enum MediaType {
    FACEBOOK,
    TWITTER,
    INSTAGRAM,
    PERISCOPE
}

export interface IMediaInfo {
    mediaType: MediaType;
    icon: string;
    pre_url: string
    url: string
}

export class MediaTypeFactory {
    static GetMediaInfo(mediaType: MediaType): IMediaInfo {
        if (mediaType === MediaType.FACEBOOK) {
            return {
                mediaType: MediaType.FACEBOOK,
                icon: "send",
                pre_url: "www.facebook.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.TWITTER) {
            return {
                mediaType: MediaType.TWITTER,
                icon: "dashboard",
                pre_url: "www.twitter.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.INSTAGRAM) {
            return {
                mediaType: MediaType.INSTAGRAM,
                icon: "favorite",
                pre_url: "www.instragram.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.PERISCOPE) {
            return {
                mediaType: MediaType.PERISCOPE,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
    }
}
