import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketComponent } from './basket.component';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockUserService } from '../test/mocks/user.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { User } from '../beans/user';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let mockUserService: MockUserService;
  let de: DebugElement;
  let el: HTMLElement;
  let userS: UserService;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
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

  it('should render `Basket` in a h3 tag', () => {
    de = fixture.debugElement.query(By.css('.k-info-block'));
    el = de.nativeElement;
    expect(el.querySelector('h3').textContent).toContain('Basket');
  });

  it('should return total price in fakebasket',  () => {
   component.items = [
        { product : {id: 0, name: 'angular', author: 'bob', price: 30, description: ' angular recipes', category: 'info', isNew: false,
                    comments: [{rate: 1, user: 'james', comment: 'i like it'}], rating: 3},
          qty: 3
        },
        { product : {id: 1, name: 'jasmine', author: 'haro', price: 55, description: ' jasmine recipes', category: 'info', isNew: true,
                    comments: [{rate: 1, user: 'me', comment: 'good book'}, { rate: 2, user: 'test', comment: 'I like it'}]},
          qty: 2
        }
    ];
   expect(component.getTotal()).toBeGreaterThan(150);
   expect(component.getTotal()).toBeLessThanOrEqual(205);
   expect(component.getTotal()).toEqual(200);

  });

});
