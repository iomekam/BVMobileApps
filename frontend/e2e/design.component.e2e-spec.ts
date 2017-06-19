import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {PopoverModule} from "ngx-popover";
import {DragulaModule} from "ng2-dragula";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {SuiModule} from "ng2-semantic-ui";
import {ColorPickerModule} from "angular2-color-picker";
import {$, browser, by, element, ElementArrayFinder, protractor} from "protractor";
import {DesignComponent} from "../src/app/bv-sections/design/design.component";
import {ImageCropperModule} from "../src/app/ng2-img-cropper/src/imageCropperModule";
import {DeviceService} from "../src/app/bv-sections/device-mockup/device.service";
import 'reflect-metadata';
import {log} from "util";
import {forEach} from "@angular/router/src/utils/collection";
import {promise, WebElement} from "selenium-webdriver";



describe('DesignComponent', () => {
  let component: DesignComponent;
  let fixture: ComponentFixture<DesignComponent>;


  const login = function () {
    const url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);

    // fillout login
    const elem1 = element(by.id('username'));
    elem1.click();
    elem1.sendKeys('taco');

    const loginButton = element(by.id('login_button'));
    loginButton.click();

    const el = element(by.className('loading-message'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.not(EC.presenceOf(el)), 20000);

  };


  const clearAppInfoPage = function () {
    const profile = element(by.id('header_item_app_info'));

    profile.click();

    const imageChooser = element(by.id('tabimageInput'))
      .element(by.tagName('img-cropper'))
      .element(by.tagName('span'))
      .element(by.tagName('input'));

    const path = require('path');
    const fileToUpload = '../src/assets/img/dummy.png'
      , absolutePath = path.resolve(__dirname, fileToUpload);

    const imagePath = '';
    imageChooser.sendKeys(imagePath);

    const appnameInput = element(by.id('app_name'));
    appnameInput.clear();

    const shortdes = element(by.id('shortdes'));
    shortdes.clear();

    const longdes = element(by.id('longdes'));
    longdes.clear();

    const tagInputDiv = element(by.className('ng2-tag-input'));
    const tagInput = tagInputDiv.element(by.tagName('tag-input-form'));

    const tags: ElementArrayFinder = element.all(by.tagName('tag'));
    tags.count().then(function (size) {
      for ( let i = size - 1; i >= 0; i--) {
        tags.get(i).element(by.tagName('div'))
          .element(by.tagName('div'))
          .element(by.tagName('delete-icon')).click();
      }
    });
  };

  const clearProfilePageSocial = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(0).click();

    const tags: ElementArrayFinder = element.all(by.className('tab'));
    tags.count().then(function (size) {
      for ( let i = size - 1; i >= 0; i--) {
        tags.get(i).getText().then(function (string) {
            if (string === 'Social') {
              tags.get(i).click();
            }
        });
      }
    });

    const EC = protractor.ExpectedConditions;
    const website = element(by.id('website_name'));
    const phone = element(by.id('phone'));
    const fb = element(by.id('inputFacebook'));
    const twit = element(by.id('inputTwitter'));
    const insta = element(by.id('inputInstagram'));
    const periscope = element(by.id('inputPeriscope'));
    // browser.wait(EC.visibilityOf(website), 20000).then(function () {
      website.clear();
    // });
    // browser.wait(EC.visibilityOf(phone), 20000).then(function () {
      phone.clear();
    // });
    // browser.wait(EC.visibilityOf(fb), 20000).then(function () {
      fb.clear();
    // });
    // browser.wait(EC.visibilityOf(twit), 20000).then(function () {
      twit.clear();
    // });
    // browser.wait(EC.visibilityOf(insta), 20000).then(function () {
      insta.clear();
    // });
    // browser.wait(EC.visibilityOf(periscope), 20000).then(function () {
      periscope.clear();
    // });
  };

  const clearProfilePageMusic = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(1).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputAudiomack'))), 20000);
    const audiomack = element(by.id('inputAudiomack'));
    audiomack.clear();

    const soundcloud = element(by.id('inputSoundCloud'));
    soundcloud.clear();

    const mixcloud = element(by.id('inputMixcloud'));
    mixcloud.clear();

    const podomatic = element(by.id('inputPodOmatic'));
    podomatic.clear();

    const blogtalk = element(by.id('inputBlogTalkRadio'));
    blogtalk.clear();
  };

  const clearProfilePageVideo = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(2).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputYoutube'))), 20000);

    const youtube = element(by.id('inputYoutube'));
    youtube.clear();

    const vimeo = element(by.id('inputVimeo'));
    vimeo.clear();

    const flickr = element(by.id('inputFlickr'));
    flickr.clear();

  };

  const clearProfilePageRadio = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(3).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputListenLive'))), 20000);

    const listenlive = element(by.id('inputListenLive'));
    listenlive.clear();

  };



  const clearAllProfilePage = function () {
    clearProfilePageSocial();
    //clearProfilePageMusic();
    //clearProfilePageRadio();
    //clearProfilePageVideo();
  };

  const populateProfilePageSocial = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(0).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('website_name'))), 20000);

    const website = element(by.id('website_name'));
    website.sendKeys('website_name');

    const phone = element(by.id('phone'));
    phone.sendKeys('666666666');

    const fb = element(by.id('inputFacebook'));
    fb.sendKeys('facebook');

    const twit = element(by.id('inputTwitter'));
    twit.sendKeys('twitter');

    const insta = element(by.id('inputInstagram'));
    insta.sendKeys('instagram');

    const periscope = element(by.id('inputPeriscope'));
    periscope.sendKeys('periscope');
  };

  const populateProfilePageMusic = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(1).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputAudiomack'))), 20000);

    const audiomack = element(by.id('inputAudiomack'));
    audiomack.sendKeys('audiomack');

    const soundcloud = element(by.id('inputSoundCloud'));
    soundcloud.sendKeys('soundcloud');

    const mixcloud = element(by.id('inputMixcloud'));
    mixcloud.sendKeys('mixcloud');

    const podomatic = element(by.id('inputPodOmatic'));
    podomatic.sendKeys('podomatic');

    const blogtalk = element(by.id('inputBlogTalkRadio'));
    blogtalk.sendKeys('blogtalk');
  };

  const populateProfilePageVideo = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(2).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputYoutube'))), 20000);
    const youtube = element(by.id('inputYoutube'));
    youtube.sendKeys('youtube');

    const vimeo = element(by.id('inputVimeo'));
    vimeo.sendKeys('vimeo');

    const flickr = element(by.id('inputFlickr'));
    flickr.sendKeys('flickr');

  };

  const populateProfilePageRadio = function () {
    // tabs

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
    element.all(by.className('mat-tab-labels')).get(3).click();

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(element(by.id('inputListenLive'))), 20000);

    const listenlive = element(by.id('inputListenLive'));
    listenlive.sendKeys('lisenlive');
  };

  const populateAllProfilePage = function () {
    //populateProfilePageSocial();
    //populateProfilePageMusic();
    //populateProfilePageRadio();
    //populateProfilePageVideo();
  };

  const clearBlogPage = function () {

  };


  const populateAppInfoPage = function () {
    const imageChooser = element(by.id('tabimageInput'))
      .element(by.tagName('img-cropper'))
      .element(by.tagName('span'))
      .element(by.tagName('input'));

    const path = require('path');
    const fileToUpload = '../src/assets/img/dummy.png'
      , absolutePath = path.resolve(__dirname, fileToUpload);

    imageChooser.sendKeys(absolutePath);
    const deviceappname = element(by.id('device_appname'));
    const deviceshortdes = element(by.id('device_shortdes'));


    const appNameString = 'Test';
    const appnameInput = element(by.id('app_name'));
    appnameInput.sendKeys(appNameString);
    deviceappname.getText().then(function (text) {
      expect(text).toMatch(appNameString);
    });

    const shortdesString = 'shortdes';
    const shortdes = element(by.id('shortdes'));
    shortdes.sendKeys(shortdesString);
    deviceshortdes.getText().then(function (text) {
      expect(text).toMatch(shortdesString);
    });

    const longdes = element(by.id('longdes'));
    longdes.sendKeys('longdes');

    const tagInputDiv = element(by.className('ng2-tag-input'));
    const tagInput = tagInputDiv.element(by.tagName('tag-input-form'))
      .element(by.tagName('form'))
      .element(by.tagName('input'));

    for ( let i = 0; i < 3; i++) {
      tagInput.sendKeys('tag' + i);
      tagInput.sendKeys(protractor.Key.ENTER);
    }
  };
  /*
  it('should login and clear info page and test to see if written values are reflected', () => {
    const url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);
    login();
    clearAppInfoPage();

    populateAppInfoPage();
    const nextButton = element(by.id('next_button'));
    nextButton.click();

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);
  });
*/
  it('should login get to the profileinfo and fill out stuff and go to blog', () => {
    const url = 'http://localhost:4200/';
    browser.ignoreSynchronization = true
    browser.get(url);
    expect(browser.driver.getCurrentUrl()).toEqual(url);
    login();
    clearAppInfoPage();

    populateAppInfoPage();
    const nextButton = element(by.id('next_button'));
    nextButton.click();

    expect(element(by.className('mat-tab-labels')).isPresent()).toBe(true);

    clearAllProfilePage();
    populateAllProfilePage();

    const nextButtonProfile = element(by.id('next_button'));
    nextButton.click();
  });


  /**

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
**/

});



