import { BvImage } from '../shared/bv-image';

export interface IBlogPost {
    id: number;
    headline: string;
    body: string;
    image: BvImage;
    keywords: string[];
    date: Date;
}
