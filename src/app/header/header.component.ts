import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'bv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit  {

    readonly appInfoID = 0;
    readonly profileInfoID = 1;
    readonly blogInfoID = 2;
    readonly designInfoID = 3;

    isAppInfoCurrent = true;
    isProfileInfoCurrent = false;
    isBlogCurrent = false;
    isDesignCurrent = false;

    private currentID: number;

    constructor() { }

    toggleCurrent(id: number): void {

        // Just in case we get a NaN, exit early
        if (isNaN(id)) {
            return;
        }

        // We should reset the state before we update the id and current
        this.clearCurrent();

        if (id === this.appInfoID) {
            this.isAppInfoCurrent = true;
            this.currentID = this.appInfoID;
        }
        else if (id === this.profileInfoID) {
            this.isProfileInfoCurrent = true;
            this.currentID = this.profileInfoID;
        }
        else if (id === this.blogInfoID) {
            this.isBlogCurrent = true;
            this.currentID = this.blogInfoID;
        }
        else if (id === this.designInfoID) {
          this.isDesignCurrent = true;
          this.currentID = this.designInfoID;
        }
    }

    clearCurrent(): void {
        this.isAppInfoCurrent = false;
        this.isProfileInfoCurrent = false;
        this.isBlogCurrent = false;
        this.isDesignCurrent = false;
    }

    ngOnInit() {
      this.currentID = this.appInfoID;
    }
}
