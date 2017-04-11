import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnsenModule } from 'angular2-onsenui';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

@Component({
  selector: 'bv-device-mockup',
  templateUrl: './device-mockup.component.html',
  styleUrls: ['./device-mockup.component.css']
})
export class DeviceMockupComponent implements OnInit, OnDestroy {

    public backgroundColor = '#13afeb';

    private dragulaService: DragulaService;

    constructor(private dService: DragulaService) {
      this.dragulaService = dService;
    }

    onDrag() {

    }

    onDrop() {

    }

    ngOnInit() {
      this.dragulaService.setOptions('test', {
        copy: true
      });
    }

    ngOnDestroy() {
      this.dragulaService.destroy('test');
    }
}
