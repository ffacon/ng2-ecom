import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MockUserService } from '../test/mocks/user.service';
import { Router } from '@angular/router';
import { User } from '../beans/user';
import { asyncData } from '../test/mocks/async-observable-helper';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let mockUserService: MockUserService;
  let spy: any;
  let fixture: ComponentFixture<LoginComponent>;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
  }

  function createUserServiceSpy() {
    return jasmine.createSpyObj('UserService', ['Login']);
  }

  const routerSpy = createRouterSpy();

  beforeEach(async(() => {
    mockUserService = new MockUserService();
    mockUserService.createAsyncDataSet200();
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule],
      providers: [
        {provide: UserService, useValue: mockUserService.mockService},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logUser test with spies', () => {

    const User: User = {login: 'admin', password: 'password', firstName: 'john', lastName: 'doe', nbItems: 0 };
    mockUserService.createAsyncDataSet200();
    let userService: UserService;
    userService = mockUserService.mockService;
    userService.login(User.login, User.password);

    expect(component.logUser).toBeTruthy();
    expect(userService.login).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalledTimes(1);
    expect(userService.login).toHaveBeenCalledWith(User.login, User.password);
  });
});
