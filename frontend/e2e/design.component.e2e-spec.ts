import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PopoverModule} from "ngx-popover";
import {DragulaModule} from "ng2-dragula";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SuiModule} from "ng2-semantic-ui";
import {ColorPickerModule} from "angular2-color-picker";
import {browser, by, element, protractor} from "protractor";
import {DesignComponent} from "../src/app/bv-sections/design/design.component";
import {ImageCropperModule} from "../src/app/ng2-img-cropper/src/imageCropperModule";
import {DeviceService} from "../src/app/bv-sections/device-mockup/device.service";
import 'reflect-metadata';

describe('DesignComponent', () => {
  let component: DesignComponent;
  let fixture: ComponentFixture<DesignComponent>;

  //beforeEach(async(() => {
   // TestBed.configureTestingModule({
   //   declarations: [ DesignComponent ],
   //   imports: [
   //     PopoverModule,
   //     FormsModule,
   //     ReactiveFormsModule,
    //    DragulaModule,
    //    ImageCropperModule,
    //    SuiModule,
     //   ColorPickerModule,
     /// ],
     // schemas: [ CUSTOM_ELEMENTS_SCHEMA, ],
     // providers: [DeviceService]
    //})
    //.compileComponents();
  //}));

 // beforeEach(() => {
  //  fixture = TestBed.createComponent(DesignComponent);
  //  component = fixture.componentInstance;

  //  fixture.detectChanges();
  //});

  it('should show color by default', () => {
    //expect(component).toBeTruthy();
    let url = 'http://localhost:4200/design';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    expect(browser.isElementPresent(by.css('.ui.header')));

    let elem = element(by.css('.ui.header'));

    expect(elem.getText()).toEqual('Color');

  });

  it('should upload image to tab and show on device', () => {
    //expect(component).toBeTruthy();
    let url = 'http://localhost:4200/design';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    expect(browser.isElementPresent(by.css('.ui.header')));

    let elem1 = element(by.id('card_main'));
    elem1.click();

    let imageChooser = element(by.id('tabimageInputDiv4')).element(by.tagName('img-cropper')).element(by.tagName('span')).element(by.tagName('input'));

    var path = require('path');
// Select image
    var fileToUpload = '../src/assets/img/dummy.png'
      , absolutePath = path.resolve(__dirname, fileToUpload);

    var imagePath = 'http://placehold.it/120x120&text=image1';
    imageChooser.sendKeys(absolutePath);

    let iconElm = element(by.css('#inputBackground4'));

      expect(iconElm.getCssValue("background-image")!= undefined);


  });



  it('should show color, main, more, and photo page if other pages are not accessed', () => {
    let url = 'http://localhost:4200/design';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Photos"
    ])
  });

  it('should show color, main, more, and photo page if other pages are not accessed', () => {
    let url = 'http://localhost:4200/design';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Photos"
    ])
  });

  it('should show color, main, more, and photo page if profile page is accessed but not touched', () => {
    let url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    let elem1 = element(by.id('header_item_profileInfo'));

    elem1.click();

    let elem2 = element(by.id('header_info_design'));
    elem2.click();

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Photos"
    ])
  });

  it('should show color, main, more, music, and photo page if profile page is accessed but not touched', () => {
    let url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    let elem1 = element(by.id('header_item_profileInfo'));

    elem1.click();

    var EC = protractor.ExpectedConditions;


    element.all(by.css('#md-tab-label-0-1')).get(0).click();

    let inputElement = element(by.id('inputAudiomack'));
    inputElement.sendKeys('Test');

    let elem2 = element(by.id('header_info_design'));
    elem2.click();

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Music",
      "Photos"
    ]);

  });



  it('should show color, main, more, music, and photo page if profile page is accessed but not touched', () => {
    let url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    let elem1 = element(by.id('header_item_profileInfo'));

    elem1.click();

    var EC = protractor.ExpectedConditions;


    element.all(by.css('#md-tab-label-0-2')).get(0).click();

    let inputElement = element(by.id('inputYouTube'));
    inputElement.sendKeys('Test');

    let elem2 = element(by.id('header_info_design'));
    elem2.click();

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Video",
      "Photos"
    ]);

  });

  it('should show color, main, more, radio, and photo page if profile page is accessed but not touched', () => {
    let url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);


    let elem1 = element(by.id('header_item_profileInfo'));

    elem1.click();

    var EC = protractor.ExpectedConditions;


    element.all(by.css('#md-tab-label-0-3')).get(0).click();

    let inputElement = element(by.id('inputListenLive'));
    inputElement.sendKeys('Test');

    let elem2 = element(by.id('header_info_design'));
    elem2.click();

    let headers = element.all(by.css('.col.card')).map(function(elm) {
      return elm.getText();
    });

    expect(headers).toEqual([
      "Color",
      "Main",
      "More",
      "Radio",
      "Photos"
    ]);

  });


});

