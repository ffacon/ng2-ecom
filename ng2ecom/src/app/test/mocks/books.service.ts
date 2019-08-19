import { BooksService } from '../../services/books.service';
import { asyncData } from './async-observable-helper';
import { Book } from '../../beans/book';
import { SpyObject } from './spy.obj';


export class MockBooksService {
getBooksSpy: any;
getBookSpy: any;
getRatingAverageSpy: any;
convertFromRatingSpy: any;
getRatingClassSpy: any;
fakeResponse: any;
public mockService: any;

fakeBook = { id : 12, name: 'Devenez un ninja avec Angular', author: 'Ninja-Squad',
             price: 1, description: 'Devenir un Ninja avec Angular',
             category: 'book', isNew: false,
             comments: [ { rate: 5, user: 'Facon François', comment: 'En Français.' } ]
  };


constructor() {
  this.fakeResponse = null;
  this.mockService = this.createSpyObj();
  }

  private createSpyObj(): any {
     return jasmine.createSpyObj('bookService', ['getBooks',
                                                 'getBook',
                                                 'getRatingAverage',
                                                 'convertFromRating',
                                                 'getRatingClass']);
  }

  public createAsyncDataSet200() {
    this.getBooksSpy = this.mockService.getBooks.and.returnValue(asyncData(this.fakeBook));
    this.getBookSpy = this.mockService.getBook.and.returnValue(asyncData(this.fakeBook));
    this.getRatingAverageSpy = this.mockService.getRatingAverage.and.returnValue(this);
    this.convertFromRatingSpy = this.mockService.convertFromRating.and.returnValue(this);
    this.getRatingClassSpy = this.mockService.getRatingClass.and.returnValue(this);
  }


  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array < any > {
   return [{ provide: BooksService, useValue: this }];
  }
}
