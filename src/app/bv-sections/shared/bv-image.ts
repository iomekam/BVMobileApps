import { Bounds } from '../../ng2-img-cropper';

export interface BvImage {
    original: HTMLImageElement;
    image: string;
    bounds: Bounds;
}
