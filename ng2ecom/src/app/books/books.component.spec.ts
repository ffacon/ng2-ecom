/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsModule, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { MockRouter, MockActivatedRoute } from '../test/mocks/route';
import { MockNewsService } from '../test/mocks/news.service';
import { MockBooksService } from '../test/mocks/books.service';

import { NewsService } from '../services/news.service';
import { UserService } from '../services/user.service';
import { BooksService } from '../services/books.service';
import { LocalStorageService } from '../services/local-Storage.service';

import { BooksComponent } from './books.component';
import { KPagination } from '../components/kpagination/kpagination';

import { OrderByPipe } from '../pipes/order-by.pipe';
import { FilterFieldPipe } from '../pipes/filter-field.pipe';
import { UpdateDataPipe } from '../pipes/update-data.pipe';
import { DataContainerService } from '../services/data-container.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuyZoneComponent } from '../buy-zone/buy-zone.component';


describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  
  let mockNewsService: MockNewsService;
  let mockBooksService: MockBooksService; 
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(async(()=>{

     mockNewsService = new MockNewsService();
     mockBooksService = new MockBooksService(); 
     mockActivatedRoute = new MockActivatedRoute({'id': '1'});
     mockRouter = new MockRouter();

     TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule,HttpClientModule,HttpClientTestingModule ],
      declarations: [ BooksComponent, 
                      KPagination,
                      BuyZoneComponent,
                      FilterFieldPipe,
                      OrderByPipe,
                      UpdateDataPipe ],
      providers: [
        UserService, 
        LocalStorageService,
        DataContainerService,
        {provide: NewsService, useValue: mockNewsService},
        {provide: BooksService, useValue: mockBooksService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter},
      ]
    }).compileComponents();

  }));
  beforeEach(()=>{
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
  })

  it('should create the app', ()=>{
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be created ', inject([UserService,LocalStorageService,DataContainerService],
      (userS:UserService,LocalStorageS:LocalStorageService,DataContainerS:DataContainerService)=>{
    expect(userS).toBeTruthy();
    expect(LocalStorageS).toBeTruthy();
    expect(DataContainerS).toBeTruthy();
  }));

  it('switchPage() should navigate to all pages',inject([BooksService,DataContainerService],(books:BooksService,dataCS:DataContainerService)=> {
    const comp = new BooksComponent(books);
    let page=1;
    expect(comp.currentPage).toEqual(1, 'at first 4/13');
    comp.switchPage(++page);
    expect(comp.currentPage).toEqual(2, 'at second 8/13');
    comp.switchPage(++page);
    expect(comp.currentPage).toEqual(3, 'at third 12/13');
    comp.switchPage(++page);
    expect(comp.currentPage).toEqual(4, 'at last 13/13');

  }));
  
});
