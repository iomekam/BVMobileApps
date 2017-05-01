import { Bounds } from '../../ng2-img-cropper';

export interface BvImage {
    original: HTMLImageElement;
    originalBase64: string;
    image: string;
    bounds: Bounds;
}
