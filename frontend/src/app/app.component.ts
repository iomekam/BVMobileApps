import { Component } from '@angular/core';
import { SharedService } from './bv-sections/shared/shared.service';

@Component({
  selector: 'bv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'BV Mobile Apps';

  constructor(
      private _sharedService: SharedService) { }
}
