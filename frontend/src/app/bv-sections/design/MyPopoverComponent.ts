import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Params, PopoverFactory} from 'angular2-onsenui';


@Component({
  template: `

  `
})
export class MyPopoverComponent implements OnInit {

  @ViewChild('popover') _popover: any;

  message = '';

  constructor(params: Params) {
    this.message = <string>params.at('msg');
  }

  ngOnInit() {
  }

  onPreHide(event) {
    // event.cancel(); // cancel hiding popover
  }
}
