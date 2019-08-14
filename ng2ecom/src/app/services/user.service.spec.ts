/* tslint:disable:no-unused-variable */
import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { LocalStorageService } from './local-Storage.service';
import { HttpClientModule, HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../beans/user';

describe('UserService', () => {

  let userService, us: UserService;
  let localStorageService: LocalStorageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        {provide: UserService, useClass: UserService},
        {provide: LocalStorageService, useClass: LocalStorageService},
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
    expect(localStorage).toBeTruthy();
  });

  it('should use UserService & islogged tobe false  ', () => {

    expect(userService.isLogged).toBe(false);
  });

  describe('# authentification user \'login\'', () => {

    let Users: User[];
    let _body, body;
    let loginUser: User;
    const url = `/api/app/login`;

    beforeEach(() => {
        userService = TestBed.get(UserService);
        // true users
        Users = [
                  {login: 'admin', password: 'password', firstName: 'john', lastName: 'doe', nbItems: 0 },
                  {login: 'admin', password: 'admin', firstName: 'marcel', lastName: 'paul', nbItems: 0 }
               ] as User[];
        // _body : false coordinates
        _body = JSON.parse('{"login":"log","password":"pass"}');
        // the correct coordinates
        body = JSON.parse('{"login":"admin","password":"password"}');

        loginUser = { login: 'admin', password: 'password', firstName: 'john', lastName: 'doe', nbItems: 0 };
    });

    it('should sign-in with a user and return it', () => {

      expect(userService.isLogged).toBe(false);
      userService.login(loginUser.login, loginUser.password).subscribe(
        data => {expect(data).toEqual(loginUser, 'should return the user');
                 expect(data.login).toEqual(body.login);
                 expect(userService.isLogged).toBe(true);
                },
        fail

      );

      // UserService should have made one request
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      const expected_verification = JSON.stringify(body);
      expect(req.request.body).toEqual(expected_verification);
      expect(req.request.headers.get('Content-Type')).toEqual('application/json');
      expect(req.request.url).toEqual(url);
      // Expect server to return the user after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: Users[0]});
      req.event(expectedResponse);
    });

  });

});
