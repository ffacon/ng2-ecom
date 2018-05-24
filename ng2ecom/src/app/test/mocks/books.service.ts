import { SpyObject } from './spy.obj';
import { BooksService } from '../../services/books.service';
import Spy = jasmine.Spy;


export class MockBooksService extends SpyObject {
  getBooksSpy: Spy;
  getBookSpy: Spy;
  getRatingAverageSpy: Spy;
  convertFromRatingSpy: Spy;
  getRatingClassSpy: Spy;
  fakeResponse: any;

  constructor() {
    super( BooksService );

    this.fakeResponse = null;
    this.getBooksSpy = this.spy('getBooks').andReturn(this);
    this.getBookSpy = this.spy('getBook').andReturn(this);
    this.getRatingAverageSpy = this.spy('getRatingAverage').andReturn(this);
    this.convertFromRatingSpy = this.spy('convertFromRating').andReturn(this);
	this.getRatingClassSpy = this.spy('getRatingClass').andReturn(this);
  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
	return [{ provide: BooksService, useValue: this }];
  }
}