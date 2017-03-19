import { Component, OnInit } from '@angular/core';
import { CropperSettings } from 'ng2-img-cropper';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    private blogTitle: string;
    private date: string;
    private content: string;
    private keywords: string[];

    private data: any;
    private cropperSettings: CropperSettings;

    constructor() {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 100;
        this.cropperSettings.croppedHeight = 100;
        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.data = {};
    }

    ngOnInit() {
    }

}
