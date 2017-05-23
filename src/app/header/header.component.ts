import { Component, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { HeaderService } from './header.service';
import { Router } from '@angular/router';
import { ValidationService } from '../bv-sections/shared/validation.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'bv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

    readonly appInfoID = 0;
    readonly profileInfoID = 1;
    readonly blogInfoID = 2;
    readonly designInfoID = 3;

    isAppInfoCurrent = true;
    isProfileInfoCurrent = false;
    isBlogCurrent = false;
    isDesignCurrent = false;

    isAppInfoValid = false;
    isProfileInfoValid = false;
    isBlogValid = false;
    isDesignInfoValid = false;
    isDeviceValid = false;

    private gotoUnsub = new Subject<void>();
    private nextUnsub = new Subject<void>();
    private prevUnsub = new Subject<void>();

    private appInfoUnsub = new Subject<void>();
    private profileUnsub = new Subject<void>();
    private blogUnsub = new Subject<void>();
    private designUnsub = new Subject<void>();

    private currentID: number;

    constructor(
        private _router: Router,
        private _headerService: HeaderService,
        private _validationService: ValidationService) { }

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

    goToHeader(): void {
        if (this.currentID == this.appInfoID) {
            this._router.navigate(['/app-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.profileInfoID) {
            this._router.navigate(['/app-profile-info'], { skipLocationChange: true });
        }
        else if (this.currentID == this.blogInfoID) {
            this._router.navigate(['/app-blog'], { skipLocationChange: true });
        }
        else if (this.currentID == this.designInfoID) {
            this._router.navigate(['/design'], { skipLocationChange: true });
        }
    }

    ngOnInit() {
      this.currentID = this.appInfoID;

      this._headerService.next$.takeUntil(this.nextUnsub).subscribe(
          empty => {
              this.toggleCurrent(this.currentID + 1);
              this.goToHeader();
          }
      );

      this._headerService.prev$.takeUntil(this.prevUnsub).subscribe(
          empty => {
              this.toggleCurrent(this.currentID - 1);
              this.goToHeader();
          }
      );

      this._headerService.goto$.takeUntil(this.gotoUnsub).subscribe(
          id => {
              this.toggleCurrent(id);
              this.goToHeader();
          }
      );

      this._validationService.isAppInfoPageValid$.takeUntil(this.appInfoUnsub).subscribe(
            isValid => this.isAppInfoValid = isValid
      );

      this._validationService.isProfileInfoPageValid$.takeUntil(this.profileUnsub).subscribe(
            isValid => this.isProfileInfoValid = isValid
      );

      this._validationService.blogValidPage$.takeUntil(this.blogUnsub).subscribe(
            isValid => this.isBlogValid = isValid
      );

      this._validationService.designValidPage$.takeUntil(this.designUnsub).subscribe(
            isValid => this.isDeviceValid = isValid
      );

      
    }

    ngOnDestroy() {
        this.gotoUnsub.next();
        this.nextUnsub.next();
        this.prevUnsub.next();
        this.appInfoUnsub.next();
        this.profileUnsub.next();
        this.blogUnsub.next();
        this.designUnsub.next();

        this.gotoUnsub.complete();
        this.nextUnsub.complete();
        this.prevUnsub.complete();
        this.appInfoUnsub.complete();
        this.profileUnsub.complete();
        this.blogUnsub.complete();
        this.designUnsub.complete();
    }
}
