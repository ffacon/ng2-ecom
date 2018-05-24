/* tslint:disable:no-unused-variable */

import { NewsService } from './news.service';
import { LocalStorageService } from './local-Storage.service'
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import {News} from '../beans/news';

describe('NewsService with mocks', () => {
  let newsService: NewsService;
  let localStorageService:LocalStorageService;
  let httpMock: HttpTestingController;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: NewsService, useClass: NewsService},
        {provide: LocalStorageService, useClass: LocalStorageService}
      ]
    });
    
    httpTestingController=TestBed.get(HttpTestingController);
    newsService=TestBed.get(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(()=> {
    httpTestingController.verify();
  });

  describe('# getNews ',() =>{
    //declarartions
    let expectedNews:News[];
    beforeEach(()=>{
        newsService=TestBed.get(NewsService);
        expectedNews=[
          { id: 5, author: "marcos", category: "dev", content: "I hate Javascript!", likes: 500 },
          { id: 7, author: "François", category: "Security", content: "No CORS!", likes: 42 },
          { id: 8, author: "Nourredine", category: "Hacker", content: "white hat", likes: 120 }
         ] as News[];
    })
    it('should return expected news (called once)',()=>{
      newsService.getNews().subscribe(
        news => expect(news).toEqual(expectedNews, 'should return expected news'),
        fail
      );
      const req=httpTestingController.expectOne(newsService.newsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedNews);
    })
    it('should be OK returning no news', () =>{
      newsService.getNews().subscribe(
        news => expect(news.length).toEqual(0, 'should have empty news array'),
        fail
      );
      const req=httpTestingController.expectOne(newsService.newsUrl);
      req.flush([]);
    })
    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      newsService.getNews().subscribe(
        news => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(newsService.newsUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should be called 3 times', () => {
      newsService.getNews().subscribe();
      newsService.getNews().subscribe();
      newsService.getNews().subscribe();
      
      const requests = httpTestingController.match(newsService.newsUrl);
      expect(requests.length).toBeLessThanOrEqual(3, 'call getNews()');

      requests[0].flush([]);
    });
  })

  describe('# addLike ',() =>{
    //declarations
    let expectedLikeNews:News;
    beforeEach(()=>{
      newsService=TestBed.get(NewsService);
      expectedLikeNews=
        { id:5 , author: "marcos", category: "dev", content: "I hate Javascript!", likes: 0 };
    })
   
  })
});
