import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Params, PopoverFactory} from 'angular2-onsenui';


@Component({
  template: `
    <ons-popover direction="up down" cancelable #popover (prehide)="onPreHide($event)">
      <div style="text-align: center; opacity: 0.7;">
        <p>{{message}}</p>
        <p><ons-button (click)="popover.hide()" modifier="light">Hide</ons-button></p>
      </div>
    </ons-popover>
  `
})
export class MyPopoverComponent implements OnInit {

  @ViewChild('popover') _popover: any;

  message = '';

  constructor(params: Params) {
    this.message = <string>params.at('msg');
  }

  ngOnInit() {
    console.log('popover:', this._popover.nativeElement);
  }

  onPreHide(event) {
    // event.cancel(); // cancel hiding popover
  }
}
