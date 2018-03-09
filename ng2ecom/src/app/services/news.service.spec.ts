/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewsService } from './news.service';
import { LocalStorageService } from './localStorage.service'
import { HttpClientModule, HttpClient, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {News} from '../beans/news';

describe('NewsService with mocks', () => {
  let newsService: NewsService;
  let localStorageService:LocalStorageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [
        {provide: NewsService, useClass: NewsService},
        {provide: LocalStorageService, useClass: LocalStorageService}  
      ]
    });
    httpClient=TestBed.get(HttpClient);
    httpTestingController=TestBed.get(HttpTestingController);
    newsService=TestBed.get(NewsService);
  });
  afterEach(()=> {
    httpTestingController.verify();
  });

  it('should be created ', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));

  describe('# getNews ',() =>{
    //declarartions
    let expectedNews:News[];
    beforeEach(()=>{
        newsService=TestBed.get(NewsService);
        expectedNews=[
          { id: 5, author: "marcos", category: "dev", content: "I hate Javascript!", likes: 500 },
          { id: 7, author: "hamid", category: "Security", content: "My survey application is finally deployed.", likes: 42 },
          { id: 8, author: "zouhir", category: "Hacker", content: "white hat", likes: 120 }
         ] as News[];
    })
    it('should return expected news (called once)',()=>{
      newsService.getNews().then(
        news => expect(news).toEqual(expectedNews, 'should return expected news'),
        fail
      );
      const req=httpTestingController.expectOne(newsService.newsUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedNews);
    })
    it('should be OK returning no news', () =>{
      newsService.getNews().then(
        news => expect(news.length).toEqual(0, 'should have empty news array'),
        fail
      );
      const req=httpTestingController.expectOne(newsService.newsUrl);
      req.flush([]);
    })
    it('should turn 404 into a user-friendly error', () => {
      const msg = '404 Not Found';
      newsService.getNews().then(
        news => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );

      const req = httpTestingController.expectOne(newsService.newsUrl);

      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should we call once, even if we have called several times', () => {
      newsService.getNews().then();
      newsService.getNews().then();
      newsService.getNews().then();
      
      const requests = httpTestingController.match(newsService.newsUrl);
      expect(requests.length).toBeLessThanOrEqual(1, 'call getNews()');

      requests[0].flush([]);
    });
  })

  describe('# addLike ',() =>{
    //declarations
    let expectedLikeNews:News[];
    beforeEach(()=>{
      newsService=TestBed.get(NewsService);
      expectedLikeNews=[
        { id: 5, author: "marcos", category: "dev", content: "I hate Javascript!", likes: 0 },
        { id: 6, author: "antoine", category: "anything", content: "no content", likes: 1 }
       ] as News[];
    })
    it('should addlike multiple times to the news ',()=>{
      newsService.addLike(expectedLikeNews[0]);
      newsService.addLike(expectedLikeNews[0]);
      newsService.addLike(expectedLikeNews[0]);
      
      const requests = httpTestingController.match(`${newsService.newsUrl}/like/${expectedLikeNews[0].id}`);
      expect(requests.length).toEqual(3, 'calls to addLike() of id:5');
      
     
      requests[0].flush([]);
      requests[1].flush(expectedLikeNews[0]);
      requests[2].flush(expectedLikeNews[1]);
    })
  })
});
