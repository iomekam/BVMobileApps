import { Component, OnInit } from '@angular/core';
import { ColorPickerService, Rgba } from 'angular2-color-picker';

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  templateUrl: 'design.component.html',
  styleUrls: ['design.component.css'],
})
export class DesignComponent {

    public arrayColors: any = {};

    public selectedColor = 'color';

    public colorTab = true;
    public musicTab = true;
    public videoTab = true;
    public photoTab = true;
    public optionalTab = true;
    public optionalTab2 = true;


    public color = '#13afeb';
    public color2 = '#13afeb';

    private test = false;
    private colorTabID = 1;
    private musicTabID = 2;
    private videoTabID = 3;
    private photoTabID = 4;
    private optionalTabID = 5;
    private optionalTab2ID = 6;

    private currentID = -1;

    public cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

    constructor(private cpService: ColorPickerService) {
      this.arrayColors['color'] = '#2883e9';
      this.arrayColors['color2'] = '#e920e9';
    }


    public toggleCollapse(location) {
      console.log(location);
      console.log(this.currentID);
      if (location === this.currentID) {
        if (location === this.colorTabID) {
          this.colorTab = !this.colorTab;
        }
        else if (location === this.musicTabID) {
          this.musicTab = !this.musicTab;
        }
        else if (location === this.videoTabID) {
          this.videoTab = !this.videoTab;
        }
        else if (location === this.photoTabID) {
          this.photoTab = !this.photoTab;
        }
        else if (location === this.optionalTabID) {
          this.optionalTab = !this.optionalTab;
        }
        else if (location === this.optionalTab2ID) {
          this.optionalTab2 = !this.optionalTab2;
        }
      }
      else {
        this.clearTabs();
        if (location === this.colorTabID) {
          this.colorTab = false;
          this.currentID = location;
        }
        else if (location === this.musicTabID) {
          this.musicTab = false;
          this.currentID = location;
        }
        else if (location === this.videoTabID) {
          this.videoTab = false;
          this.currentID = location;
        }
        else if (location === this.photoTabID) {
          this.photoTab = false;
          this.currentID = location;
        }
        else if (location === this.optionalTabID) {
          this.optionalTab = false;
          this.currentID = location;
        }
        else if (location === this.optionalTab2ID) {
          this.optionalTab2 = false;
          this.currentID = location;
        }
      }
    }

  clearTabs() {
    this.colorTab = true;
    this.musicTab = true;
    this.videoTab = true;
    this.photoTab = true;
    this.optionalTab = true;
    this.optionalTab2 = true;
  }

  onChangeColor(color: string) {

  }

  rgbaToCmyk(rgba: Rgba): Cmyk {
    const cmyk: Cmyk = new Cmyk(0, 0, 0, 0);
    const k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
    if (k === 1) { return new Cmyk(0, 0, 0, 1); }
    cmyk.c = (1 - rgba.r - k) / (1 - k);
    cmyk.m = (1 - rgba.g - k) / (1 - k);
    cmyk.y = (1 - rgba.b - k) / (1 - k);
    cmyk.k = k;
    return cmyk;
  }

  onChangeColorHex8(color: string): string {
    return this.cpService.outputFormat(this.cpService.stringToHsva(color, true), 'rgba', true);
  }

}
