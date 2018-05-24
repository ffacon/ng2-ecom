/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BooksService } from './books.service';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Book } from '../beans/book';

describe('BooksService', () => {
  let bookService:BooksService;
  let httpClient:HttpClient;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
       providers: [
        {provide: BooksService, useClass: BooksService},
      ]
    });
    httpClient=TestBed.get(HttpClient);
    httpTestingController=TestBed.get(HttpTestingController);
    bookService=TestBed.get(BooksService);
  });
  
  afterEach(()=> {
    httpTestingController.verify();
  });

  it('should be created', inject([BooksService], (service: BooksService) => {
    expect(service).toBeTruthy();
  }));

  describe('# getBook ',() =>{
    let expectedBook:Book[];
    const url='/data/books.json';
    beforeEach(()=>{
      bookService=TestBed.get(BooksService);
      expectedBook=[
                    {id:0,name:"angular",author:"joe",price:30,description:" qqch ..",category:"info",isNew:false,
                    comments:[{rate:1, user:"alfred",comment:"no comment"}], rating:3}
                  ] as Book[];
    })
    it('should return expectd book by id',()=>{
      bookService.getBook(expectedBook[0].id).subscribe(
        book => expect(book).toEqual(expectedBook[0]),
        fail
      );
      const req=httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedBook);
    });
    
  })

  describe('# getRatingClass ',() =>{
    let expectedBook:Book[];
    beforeEach(()=>{
      bookService=TestBed.get(BooksService);
      expectedBook=[
        {id:0,name:"angular",author:"lui",price:30,description:" qqch ..",category:"info",isNew:false,
        comments:[{rate:1, user:"titi",comment:"no comment"}], rating:3
        },
        {
          id:1,name:"node Js",author:"phillipe",price:43,description:" good book",category:"info",isNew:true,
          comments:[{rate:2, user:"yassine",comment:" magnifique livre"},
                    {rate:5, user:"sylvain",comment:"very good"},
                    {rate:5,user:"françois",comment:"très bon livre"}]
        }
      ] as Book[];
    })
    it('sould return \'rating 3\', with convertFromRating ',()=>{
      let expectedRating=bookService.getRatingClass(expectedBook[0]);
      expect(expectedRating).toEqual('rating three');
    });
    it('sould return \'rating 4\', with getRatingAverage ',()=>{
      let expectedRating=bookService.getRatingClass(expectedBook[1]);
      expect(expectedRating).toEqual('rating four');
    })
  })

});
