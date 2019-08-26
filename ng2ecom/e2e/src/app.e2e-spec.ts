import { AppPage } from './app.po';
import { Ng2EComBooksPage } from './app.books';
import { browser, logging } from 'protractor';

describe('ng2-e-com App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ALL THE BOOKS YOU NEED, AT THE HIGHEST PRICE!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
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

    const defaultNbBooks = 4;
    const booksList = page.getBooksList();
    expect(booksList.count()).toEqual(defaultNbBooks);
   });

  it('Update books per page value', () => {

      const updateNbBooks = 2;
      const input = page.getInput4nbPerPage();

      input.clear();
      input.sendKeys('2');
      const booksList = page.getBooksList();

      expect(booksList.count()).toEqual(updateNbBooks);
    });

  it('Check the filter by name', () => {
      const filterValue = 'NINJA';
      const input = page.getInput4bookName();

      input.clear();
      input.sendKeys(filterValue);
      const booksList = page.getBooksList();

      expect(booksList.count()).toEqual(1);
    });
});
