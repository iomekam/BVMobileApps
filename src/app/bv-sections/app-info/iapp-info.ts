import { BvImage } from '../shared/bv-image';

export interface IAppInfo {
    appName: string;
    shortDescription: string;
    longDescription: string;
    keywords: string[];
    image: BvImage;
}
