import { AppPage } from './app.po';
import { Ng2EComBooksPage } from './app.books';

describe('ng2-e-com App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ALL THE BOOKS YOU NEED, AT THE HIGHEST PRICE!');
  });
});

describe('ng2-e-com books', () => {
  let page: Ng2EComBooksPage;
  
    beforeEach(() => {
      page = new Ng2EComBooksPage();
    });
  
    it('should display message saying ', () => {
       page.navigateTo();
       expect(page.getParagraphText()).toContain('ALL THE BOOKS YOU NEED, AT THE HIGHEST PRICE!');
    });
  
    beforeEach(() => {
      page = new Ng2EComBooksPage();
    });
  
   it('should have 4 books in the page by default', () => {
  
      var defaultNbBooks= 4;
      var booksList= page.getBooksList();
  
      expect(booksList.count()).toEqual(defaultNbBooks);
    });
  
    it('Update books per page value', () => {
  
      var updateNbBooks= 2;
      var input= page.getInput4nbPerPage();
  
      input.clear();
      input.sendKeys('2');
      var booksList= page.getBooksList();
      
      expect(booksList.count()).toEqual(updateNbBooks);
    });
  
    it('Check the filter by name', () => {
  
      var filterValue= 'NINJA';
      var input= page.getInput4bookName();
  
      input.clear();
      input.sendKeys(filterValue);
      var booksList= page.getBooksList();
      
      expect(booksList.count()).toEqual(1);
    });  
});