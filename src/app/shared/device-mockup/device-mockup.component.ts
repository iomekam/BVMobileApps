import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit {

    @Input("headerText") text: string;

    constructor() { }

    ngOnInit() {
    }

}
