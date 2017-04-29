import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { HeaderService } from '../../header/header.service';

@Component({
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})

export class ProfileInfoComponent implements OnInit {

    constructor(private _headerService: HeaderService) {
    }

    ngOnInit() {

    }
}
