import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'bv-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

    constructor(private _headerService: HeaderService) {}

    ngOnInit() {

    }
}
