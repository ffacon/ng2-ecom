import { SpyObject } from './spy.obj';
import { UserService } from '../../services/user.service';
import Spy = jasmine.Spy;

export class MockUserService extends SpyObject {
 
  public loginSpy: Spy;
  public logoutSpy: Spy;
  public fakeResponse: any;

  constructor() {
    super( UserService );

    this.fakeResponse = null;
    this.loginSpy = this.spy('loginLike').andReturn(this);
    this.logoutSpy = this.spy('logoutNews').andReturn(this);
    this.fakeResponse = this.spy('fakeResponse').andReturn(this);

  }

  subscribe(callback: any) {
    callback(this.fakeResponse);
  }

  setResponse(json: any): void {
    this.fakeResponse = json;
  }

  getProviders(): Array<any> {
	return [{ provide: UserService, useValue: this }];
  }
}