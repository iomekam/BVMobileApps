import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../shared/validation.service';
import { PageLoadingService, BVPages } from '../shared/page-loading.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'bv-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

    public isValid: boolean;
    private validUnsub = new Subject<void>();

    constructor(
      private _headerService: HeaderService,
      private _pageValidation: PageLoadingService,
      private _validationService: ValidationService) {}

    ngOnInit() {
      this.isValid = this._validationService.getBlogValidPage();

      this._validationService.blogValidPage$.takeUntil(this.validUnsub).subscribe(
        isValid => this.isValid = isValid
      );

      this._pageValidation.savePage(BVPages.BLOG);
    }

    ngOnDestroy() {
      this.validUnsub.next();
      this.validUnsub.complete();
    }
}
