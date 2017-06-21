import { browser, element, by } from 'protractor';

export class V2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

   window.sessionStorage.setItem("test", "true");
}
