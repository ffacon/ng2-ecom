import { SpyObject } from './spy.obj';
import { UserService } from '../../services/user.service';
import { asyncData } from './async-observable-helper';
import { Basket } from '../../beans/basket';
import { MockBooksService } from './books.service';
import Spy = jasmine.Spy;

export class MockUserService  {
public loginSpy: Spy;
public logoutSpy: Spy;
public getBasket: Spy;
public fakeResponse: any;
public mockService: any;
public fakeBasket: Basket;
public mockBooksService: MockBooksService;

public loginResp = {firstName: 'john', lastName: 'doe', nbItems: 0};

  constructor() {
      this.fakeResponse = null;
      this.mockService = this.createSpyObj();
      this.mockBooksService = new MockBooksService();
      }

  private createSpyObj(): any {
         return jasmine.createSpyObj('UserService', ['login', 'getBasket']);
      }

  public createAsyncDataSet200() {
    this.fakeBasket = new Basket();
    this.fakeBasket.addProduct(this.mockBooksService.fakeBook);
    this.loginSpy = this.mockService.login.and.returnValue(this.loginResp);
    this.getBasket = this.mockService.getBasket.and.returnValue(this.fakeBasket);

  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array < any > {
    return [{ provide: UserService, useValue: this }];
  }
}
