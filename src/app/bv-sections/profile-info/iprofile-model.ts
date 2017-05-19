export interface IProfileModel {
    website: string;
    noWebsite: boolean;
    phone_number: string;
    socialInfo: IMediaInfo[];
    videoInfo: IMediaInfo[];
    musicInfo: IMediaInfo[];
    radioInfo: IMediaInfo[];
}

// All the valid media we support
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
    mediaName: string;
    icon: string;
    pre_url: string;
    username: string;
    color: string;
    length: number;
    iconLocation:string
}

// List of all the different media sites with icons, names, url, color theme, etc
export class MediaTypeFactory {
    static GetMediaInfo(mediaType: MediaType): IMediaInfo {
        if (mediaType === MediaType.FACEBOOK) {
            return {
                mediaType: MediaType.FACEBOOK,
                mediaName: 'Facebook',
                icon: 'socicon socicon-facebook',
                pre_url: 'www.facebook.com/',
                username: '',
                color: '#3b5998',
                length: 200,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.TWITTER) {
            return {
                mediaType: MediaType.TWITTER,
                mediaName: 'Twitter',
                icon: 'socicon socicon-twitter',
                pre_url: 'www.twitter.com/',
                username: '',
                color: '#4099FF',
                length: 20,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.INSTAGRAM) {
            return {
                mediaType: MediaType.INSTAGRAM,
                mediaName: 'Instagram',
                icon: 'socicon socicon-instagram',
                pre_url: 'www.instragram.com/',
                username: '',
                color: '#458eff',
                length: 50,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.PERISCOPE) {
            return {
                mediaType: MediaType.PERISCOPE,
                mediaName: 'Periscope',
                icon: 'socicon socicon-periscope',
                pre_url: 'www.periscope.com/',
                username: '',
                color: '#3aa4c6',
                length: 20,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.AUDIOMACK) {
            return {
                mediaType: MediaType.AUDIOMACK,
                mediaName: 'Audiomack',
                icon: '',
                pre_url: 'www.audiomack.com/',
                username: '',
                color: '#ffa200',
                length: 75,
                iconLocation: '../../../assets/img/audiomack.png',
            };
        }
        else if (mediaType === MediaType.SOUNDCLOUD) {
            return {
                mediaType: MediaType.SOUNDCLOUD,
                mediaName: 'SoundCloud',
                icon: 'socicon socicon-soundcloud',
                pre_url: 'www.soundcloud.com/',
                username: '',
                color: '#ff7700',
                length: 50,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.MIXCLOUD) {
            return {
                mediaType: MediaType.MIXCLOUD,
                mediaName: 'Mixcloud',
                icon: 'socicon socicon-mixcloud',
                pre_url: 'www.mixcloud.com/',
                username: '',
                color: '#589fc3',
                length: 30,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.PODOMATIC) {
            return {
                mediaType: MediaType.PODOMATIC,
                mediaName: 'PodOmatic',
                icon: '',
                pre_url: 'www.podomatic.com/',
                username: '',
                color: '#6e5494',
                length: 50,
                iconLocation: '../../../assets/img/podomatic.png',
            };
        }
        else if (mediaType === MediaType.BLOGTALKRADIO) {
            return {
                mediaType: MediaType.BLOGTALKRADIO,
                mediaName: 'BlogTalkRadio',
                icon: '',
                pre_url: 'www.blogtalkradio.com.com/',
                username: '',
                color: '#363739',
                length: 30,
                iconLocation: '../../../assets/img/blogTalk.png',
            };
        }
        else if (mediaType === MediaType.YOUTUBE) {
            return {
                mediaType: MediaType.YOUTUBE,
                mediaName: 'YouTube',
                icon: 'socicon socicon-youtube',
                pre_url: 'www.youtube.com/',
                username: '',
                color: '#cd201f',
                length: 60,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.VIMEO) {
            return {
                mediaType: MediaType.VIMEO,
                mediaName: 'Vimeo',
                icon: 'socicon socicon-vimeo',
                pre_url: 'www.vimeo.com/',
                username: '',
                color: '#1ab7ea',
                length: 50,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.FLICKR) {
            return {
                mediaType: MediaType.FLICKR,
                mediaName: 'Flickr',
                icon: 'socicon socicon-flickr',
                pre_url: 'www.Flikr.com/',
                username: '',
                color: '#0063dc',
                length: 30,
                iconLocation: '',
            };
        }
        else if (mediaType === MediaType.LISTENLIVE) {
            return {
                mediaType: MediaType.LISTENLIVE,
                mediaName: 'ListenLive',
                icon: 'ion-radio-waves',
                pre_url: 'www.',
                username: '',
                color: '#6e5494',
                length: 200,
                iconLocation: '',
            };
        }
    }
}
