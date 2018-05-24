/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { UserService } from '../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockUserService } from '../test/mocks/user.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {News} from '../beans/news';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockUserService: MockUserService;
  mockUserService = new MockUserService();
 
  let expectedNews: News[];
  let id_news=0;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ FormsModule, ReactiveFormsModule ,
                RouterTestingModule,HttpClientModule,HttpClientTestingModule],
      providers: [
        UserService,
        {provide: UserService, useValue: mockUserService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expectedNews = [{
      "id":0,
      "author":'Bruno',
      "category":"Troll",
      "content":"I hate Javascript!",
      "likes":8
    },
    {
      "id":1,
      "author":"Nourredine",
      "category":"Security",
      "content":"My survey application is finally deployed.",
      "likes":11},
    {
      "id":2,"author":"Nourredine","category":"True fact","content":"Angular training is awesome!!!!","likes":1200
    }
    ];

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should issue a request 'get'`,
    // 1. declare as async test since the HttpClient works with Observables
    async(
      // 2. inject HttpClient and HttpTestingController into the test
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        // 3. send a simple request
        http.get<News[]>('/api/app/news').toPromise();
        // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
        // here two, it's significantly less boilerplate code needed to verify an expected request
        backend.match({
          url: '/api/app/news',
          method: 'GET'
        });
      })
    )
  )

  it(`should issue a request 'post'`,
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {

        http.post('/api/app/news/like/',id_news=3).toPromise();

        backend.expectOne({
          url: '/api/app/news/like/',
          method: 'POST'
        });
      })
    )
  )
  
  it(` should respond with fake data`,
    async(
      inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {

        http.get<News[]>('/api/app/news').toPromise().then((news:News[]) => {
            expect(news).toEqual(expectedNews);
        });

        backend.match({
          url: '/api/app/news',
          method: 'GET'
        })[0].flush(expectedNews);
      })
    )
  );

});
