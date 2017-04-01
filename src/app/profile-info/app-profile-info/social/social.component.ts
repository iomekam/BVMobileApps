import { Component, OnInit } from '@angular/core';
import { Ng2FloatBtnComponent, Ng2FloatBtn } from 'ng2-float-btn';

@Component({
  selector: 'bv-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  private mainButton: Ng2FloatBtn;
  private buttons: Array<Ng2FloatBtn>;

  constructor() {
      this.mainButton = {
          color: "primary",
          iconName: "add"
      }

      this.buttons = [
          {
              color: "accent",
              iconName: "add",
              onClick: () => {
                 
              },
          },
          {
              color: "accent",
              iconName: "remove",
              onClick: () => {
                  
              },
          },
          {
              color: "accent",
              iconName: "test",
              onClick: () => {
                  
              },
          }
      ]

  }
  ngOnInit(): void {

  }

}
