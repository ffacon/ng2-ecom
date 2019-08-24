import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetailsComponent } from './book-details.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockRouter, MockActivatedRoute } from '../test/mocks/route';
import { ActivatedRouteStub } from '../test/mocks/activated-route-stub';

import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { BooksService } from '../services/books.service';
import { LocalStorageService } from '../services/local-Storage.service';
import { Book } from '../beans/book';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MockBooksService } from '../test/mocks/books.service';
import { asyncData } from '../test/mocks/async-observable-helper';
import { BuyZoneComponent } from '../buy-zone/buy-zone.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let expectedbook: Book;

  let mockUserService: UserService;
  let mockBooksService: MockBooksService;
  let activatedRoute: ActivatedRouteStub;

  function createRouterSpy() {
    return jasmine.createSpyObj('Router', ['navigate']);
  }
  function createUserServiceSpy() {
    return jasmine.createSpyObj('UserService', ['login']);
  }


  beforeEach(async(() => {

    mockUserService = createUserServiceSpy();
    mockBooksService = new MockBooksService();
    mockBooksService.createAsyncDataSet200();
    activatedRoute = new ActivatedRouteStub({id: 12});
    const routerSpy = createRouterSpy();

    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent,
                      BuyZoneComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, HttpClientModule ],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: BooksService, useValue: mockBooksService.mockService},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useValue: routerSpy}
      ]
    })
    .compileComponents();
  }));


  beforeEach(fakeAsync(() => {
    mockBooksService.createAsyncDataSet200();
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', fakeAsync(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should display the proprety of book ', fakeAsync(() => {
    console.log(component.book);
    mockBooksService.createAsyncDataSet200();
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.hproduct'));
    el = de.nativeElement;
    const expectedText = el.querySelector('h3').textContent;
    expect(expectedText).toContain('Devenez un ninja avec Angular');
    expect(component.book.price).toEqual(1);
  }));
});
