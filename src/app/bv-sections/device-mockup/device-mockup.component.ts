import { Component, OnInit } from '@angular/core';
import { OnsenModule } from 'angular2-onsenui';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit {

    public color = '#13afeb';
    text: string;
    backgroundColor = '#13afeb';

    constructor() {
      this.backgroundColor = '#fffff';


    }

    ngOnInit() {
    }

}
