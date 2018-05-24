import { SpyObject } from './spy.obj';
import { NewsService } from '../../services/news.service';
import Spy = jasmine.Spy;

export class MockNewsService extends SpyObject {
  public getNewsSpy: Spy;
  public addLikeSpy: Spy;
  public deleteNewsSpy: Spy;
  public addNewsSpy: Spy;
  public randomNewsSpy: Spy;
  public fakeResponse: any;

  constructor() {
    super( NewsService );

    this.fakeResponse = null;
    this.getNewsSpy = this.spy('getNews').andReturn(this);
    this.addLikeSpy = this.spy('addLike').andReturn(this);
    this.deleteNewsSpy = this.spy('deleteNews').andReturn(this);
    this.addNewsSpy = this.spy('addNews').andReturn(this);
	this.randomNewsSpy = this.spy('randomNews').andReturn(this);
  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
	return [{ provide: NewsService, useValue: this }];
  }
}