import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header/header.service';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'bv-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    public isValid: boolean;

    constructor(
      private _headerService: HeaderService,
      private _validationService: ValidationService) {}

    ngOnInit() {
      this.isValid = this._validationService.getBlogValidPage();

      this._validationService.blogValidPage$.subscribe(
        isValid => this.isValid = isValid
      );
    }
}
