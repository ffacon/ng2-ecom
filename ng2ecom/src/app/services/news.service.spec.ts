/* tslint:disable:no-unused-variable */

import { NewsService } from './news.service';
import { LocalStorageService } from './local-Storage.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed, async, inject } from '@angular/core/testing';
import {News} from '../beans/news';

describe('NewsService with mocks', () => {
  let newsService: NewsService;
  let localStorageService: LocalStorageService;
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

    httpTestingController = TestBed.get(HttpTestingController);
    newsService = TestBed.get(NewsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

});
