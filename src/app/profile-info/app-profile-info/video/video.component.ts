import { Component, OnInit } from '@angular/core';
import { IProfileModel, MediaType, IMediaInfo, MediaTypeFactory } from '../iprofile-model';

@Component({
  selector: 'bv-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    private _mediaTypes: MediaType[] = [
        MediaType.YOUTUBE,
        MediaType.VIMEO,
        MediaType.FLICKR,
    ];

    private contentArray: Array<IMediaInfo>;

    constructor() {
    }

    ngOnInit(): void {
        this.contentArray = [];

        this._mediaTypes.forEach(
            mediaType => {
                let mediaInfo = MediaTypeFactory.GetMediaInfo(mediaType);
                this.contentArray.push(mediaInfo);
            }
        );
    }
}
