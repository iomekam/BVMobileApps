import { Component, OnInit, Input } from '@angular/core';
import {OnsenModule} from "angular2-onsenui";

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit {

    public color: string = "#13afeb";
    @Input("headerText") text: string;
    @Input("backgroundText") backgroundColor: string = "#13afeb";

    constructor() {
      this.backgroundColor = "#fffff";


    }

    ngOnInit() {
    }

}
