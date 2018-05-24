/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailsComponent } from './book-details.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockRouter, MockActivatedRoute } from '../test/mocks/route';
import { MockNewsService } from '../test/mocks/news.service';
import { MockBooksService } from '../test/mocks/books.service';
import { ActivatedRouteStub } from '../test/mocks/activated-route-stub';

import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { BooksService } from '../services/books.service';
import { LocalStorageService } from '../services/local-Storage.service';
import { Book } from '../beans/book';
import { BuyZoneComponent } from '../buy-zone/buy-zone.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let expectedbook: Book;

  let mockNewsService: MockNewsService;
  let mockBooksService: MockBooksService; 
  let activatedRoute: ActivatedRouteStub;
  let mockRouter: MockRouter;
  let param:number;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
  }

  beforeEach(async(() => {

    mockNewsService = new MockNewsService();
    mockBooksService = new MockBooksService(); 
    activatedRoute = new ActivatedRouteStub({'id': 1}); 
    const routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent,
                      BuyZoneComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule,HttpClientTestingModule,HttpClientModule ],
      providers: [
        UserService, 
        BooksService,
        LocalStorageService,
        {provide: NewsService, useValue: MockNewsService},
        {provide: BooksService, useValue: mockBooksService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useValue: routerSpy},
      ]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    expectedbook = {
			"id": 1,
			"name": "AngularJS",
			"author": "Brad Green, Shyam Seshadri",
			"price": 15.34,
			"description": "Description...", 
			"category": "book", 
			"isNew": false,
			"comments": [	]
    };
    component.book = expectedbook; 
  });

  it('should create', () => {
    expect(component).toBeDefined();
    expect(component).toBeTruthy();
  });

  
  it('should display the proprety of book ',() => {
    expect(component.book.name).toContain('AngularJS');
    expect(component.book.isNew).toBe(false);
    expect(component.book.price).toEqual(15.34);
  })
});


