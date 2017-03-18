import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bv-input-page-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges  {

    readonly appInfoID: number = 0;
    readonly profileInfoID: number = 1;
    readonly blogInfoID: number = 2;

    @Input("current") currentID: number;

    isAppInfoCurrent: boolean = true;
    isProfileInfoCurrent: boolean = false;
    isBlogCurrent: boolean = false;
 
    @Output() currentChanged: EventEmitter<number> = new EventEmitter<number>();

    constructor(private _router: Router) { }

    toggleCurrent(id: number): void {

        if (isNaN(id)) {
            return;
        }

        this.clearCurrent();

        if (id == this.appInfoID) {
            this.isAppInfoCurrent = true;
            this.currentID = this.appInfoID;
        }
        else if (id == this.profileInfoID) {
            this.isProfileInfoCurrent = true;
            this.currentID = this.profileInfoID;
        }
        else if (id == this.blogInfoID) {
            this.isBlogCurrent = true;
            this.currentID = this.blogInfoID;
        }

        this.currentChanged.emit(this.currentID);  
    }

    clearCurrent(): void {
        this.isAppInfoCurrent = false;
        this.isProfileInfoCurrent = false;
        this.isBlogCurrent = false;
    }

    ngOnInit() {
    }

    ngOnChanges(): void {
        this.toggleCurrent(this.currentID);

        if (this.currentID == this.appInfoID) {
            this._router.navigate(['/app-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.profileInfoID) {
            this._router.navigate(['/app-profile-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.blogInfoID) {
            this._router.navigate(['/app-blog'], { skipLocationChange: true });
        }

    }
}
