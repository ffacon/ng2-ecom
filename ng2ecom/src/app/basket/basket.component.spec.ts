import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockUserService } from '../test/mocks/user.service';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let mockUserService: MockUserService;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
  }
  function createUserServiceSpy() {
    return jasmine.createSpyObj('UserService', ['login', 'getBasket']);
  }


  beforeEach(async(() => {
    mockUserService = new MockUserService();
    mockUserService.createAsyncDataSet200();
    const routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule ],
      providers: [
        {provide: UserService, useValue: mockUserService.mockService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
