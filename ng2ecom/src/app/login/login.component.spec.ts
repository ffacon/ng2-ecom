/* tslint:disable:no-unused-variable */
import { async,TestBed,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-Storage.service'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule,HttpRequest,HttpParams,HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../beans/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let userService : UserService;
  let localStorageService : LocalStorageService;
  let spy: any;
  let router:Router;
  let httpClient:HttpClient;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule , RouterTestingModule,HttpClientTestingModule,HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [
        {provide: UserService, useValue: userService},
        {provide: LocalStorageService, useValue: localStorageService}]
    }) .compileComponents();
   
  }));

  beforeEach(() => {
    userService=new UserService(httpClient,localStorageService);
    component = new LoginComponent(router,userService)
  });

  afterEach(()=>{
    userService=null;
    component=null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });
  
  it('should logUser test with spies',() => {
    const User:User= {login: 'admin', password:'password', firstName: "john", lastName: "doe", nbItems: 0 };
    spy = spyOn(userService, 'login').and.returnValue(User);
    userService.login(User.login,User.password)

    expect(component.logUser).toBeTruthy();
    expect(userService.login).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalledTimes(1);
    expect(userService.login).toHaveBeenCalledWith(User.login,User.password);
  })

 
});
