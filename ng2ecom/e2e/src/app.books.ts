import { browser, element, by } from 'protractor';

export class Ng2EComBooksPage {
  navigateTo() {
    browser.ignoreSynchronization = false;
    return browser.get('http://localhost:4200/books');     
  }

  getParagraphText() {
    return element(by.css('app-root h1 small')).getText();
  }

  getBooksList() {
    return element.all(by.css('article'));
  };

  getInput4nbPerPage(){
    return element(by.css('#nbPerPage'));
  };

  getInput4bookName(){
  	return element(by.css('#bookName'));
  };
}