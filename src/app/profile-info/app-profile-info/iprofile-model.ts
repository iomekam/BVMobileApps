export interface IProfileModel {
    website: string;
    phone_number: string;
    mediaInfo: IMediaInfo;
}

export enum MediaType {
    FACEBOOK,
    TWITTER,
    INSTAGRAM,
    PERISCOPE,
    AUDIOMACK,
    SOUNDCLOUD,
    MIXCLOUD,
    PODOMATIC,
    BLOGTALKRADIO,
    YOUTUBE,
    VIMEO,
    FLICKR,
    LISTENLIVE,
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
        else if (mediaType === MediaType.AUDIOMACK) {
            return {
                mediaType: MediaType.AUDIOMACK,
                icon: "send",
                pre_url: "www.facebook.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.SOUNDCLOUD) {
            return {
                mediaType: MediaType.SOUNDCLOUD,
                icon: "dashboard",
                pre_url: "www.twitter.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.MIXCLOUD) {
            return {
                mediaType: MediaType.MIXCLOUD,
                icon: "favorite",
                pre_url: "www.instragram.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.PODOMATIC) {
            return {
                mediaType: MediaType.PODOMATIC,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.BLOGTALKRADIO) {
            return {
                mediaType: MediaType.BLOGTALKRADIO,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.YOUTUBE) {
            return {
                mediaType: MediaType.YOUTUBE,
                icon: "favorite",
                pre_url: "www.instragram.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.VIMEO) {
            return {
                mediaType: MediaType.VIMEO,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.FLICKR) {
            return {
                mediaType: MediaType.FLICKR,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
        else if (mediaType == MediaType.LISTENLIVE) {
            return {
                mediaType: MediaType.LISTENLIVE,
                icon: "extension",
                pre_url: "www.periscope.com/",
                url: ""
            };
        }
    }
}
